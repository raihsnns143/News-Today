import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import NewsForm from "./NewsForm";
import { ArrowLeft, Edit, Loader } from "lucide-react";

const EditNews = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/news/single.php?id=${id}`);
        setForm(res.data);
      } catch (error) {
        console.error("Failed to load news:", error);
        alert("Failed to load news article");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadNews();
    }
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.title?.trim() || !form.details?.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setSaving(true);
      await api.post("/news/update.php", { ...form, id });
      alert("Article updated successfully!");
      window.location.href = "/admin/news";
    } catch (error) {
      console.error("Failed to update news:", error);
      alert("Failed to update article. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded-lg w-64 mb-8"></div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8">
              <div className="space-y-6">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-12 bg-gray-300 rounded"></div>
                <div className="h-32 bg-gray-300 rounded"></div>
                <div className="h-12 bg-gray-300 rounded"></div>
                <div className="h-12 bg-gray-300 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-white/70 backdrop-blur-sm text-gray-600 px-4 py-2 rounded-xl hover:bg-white/90 transition-all duration-200 shadow-sm"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                <Edit size={28} className="text-white" />
              </div>
              <span className="hidden sm:inline">Edit Article</span>
              <span className="sm:hidden">Edit News</span>
            </h1>
            <p className="text-lg text-gray-600 hidden sm:block">
              Update your news article content and details
            </p>
          </div>
        </div>

        {/* Form */}
        <NewsForm
          form={form}
          setForm={setForm}
          onSubmit={submit}
          loading={saving}
        />

        {/* Article Info */}
        <div className="mt-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Article Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-500">Article ID:</span>
              <p className="text-gray-900 font-mono">{id}</p>
            </div>
            <div>
              <span className="font-medium text-gray-500">Last Modified:</span>
              <p className="text-gray-900">{new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <span className="font-medium text-gray-500">Status:</span>
              <p className="text-green-600 font-medium">Published</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNews;
