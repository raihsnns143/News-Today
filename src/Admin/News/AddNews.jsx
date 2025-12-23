import { useState, useEffect } from "react";
import { api } from "../services/api";
import { ArrowLeft, Save, FileText, Tag, Image, Loader } from "lucide-react";

const AddNews = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category_id, setCategory] = useState("");
  const [thumbnail_url, setThumbnailUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    // Load categories
    const loadCategories = async () => {
      try {
        const res = await fetch("/categories.json");
        const data = await res.json();
        // Filter out "All News" category (id: 0) as it's not for assigning to news
        setCategories(data.filter(cat => cat.id !== 0));
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    loadCategories();
  }, []);

  const submit = async () => {
    if (!title.trim() || !content.trim() || !category_id) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      await api.post("/news/add.php", {
        title: title.trim(),
        content: content.trim(),
        category_id,
        thumbnail_url: thumbnail_url.trim(),
      });
      window.location.href = "/admin/news";
    } catch (error) {
      console.error("Failed to add news:", error);
      alert("Failed to add news article. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                <FileText size={28} className="text-white" />
              </div>
              <span className="hidden sm:inline">Add New Article</span>
              <span className="sm:hidden">Add News</span>
            </h1>
            <p className="text-lg text-gray-600 hidden sm:block">
              Create and publish a new news article
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Article Title *
                  </label>
                  <div className="relative">
                    <FileText size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50"
                      placeholder="Enter article title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <div className="relative">
                    <Tag size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50 appearance-none"
                      value={category_id}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Thumbnail URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Thumbnail Image URL
                  </label>
                  <div className="relative">
                    <Image size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50"
                      placeholder="https://example.com/image.jpg"
                      value={thumbnail_url}
                      onChange={(e) => setThumbnailUrl(e.target.value)}
                    />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Article Content *
                  </label>
                  <textarea
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50 resize-vertical"
                    placeholder="Write your article content here..."
                    rows="12"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {content.length} characters
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={submit}
                    disabled={loading}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg font-medium"
                  >
                    {loading ? (
                      <>
                        <Loader size={20} className="animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        Publish Article
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setPreviewMode(!previewMode)}
                    className="flex items-center gap-2 bg-white/70 backdrop-blur-sm text-gray-600 px-6 py-3 rounded-xl hover:bg-white/90 transition-all duration-200 shadow-sm font-medium"
                  >
                    {previewMode ? 'Edit' : 'Preview'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview/Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Article Preview</h3>

              {thumbnail_url && (
                <div className="mb-4">
                  <img
                    src={thumbnail_url}
                    alt="Thumbnail preview"
                    className="w-full h-32 object-cover rounded-xl"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Title:</span>
                  <p className="text-sm text-gray-900 font-medium mt-1">
                    {title || "Article title will appear here"}
                  </p>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">Category:</span>
                  <p className="text-sm text-gray-900 mt-1">
                    {categories.find(cat => cat.id == category_id)?.name || "No category selected"}
                  </p>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">Content Preview:</span>
                  <p className="text-sm text-gray-700 mt-1 line-clamp-4">
                    {content || "Article content will appear here..."}
                  </p>
                </div>
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 Tips</h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Use engaging titles</li>
                  <li>• Add relevant thumbnail images</li>
                  <li>• Write clear, concise content</li>
                  <li>• Choose appropriate categories</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNews;
