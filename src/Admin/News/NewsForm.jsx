import { Save, FileText, Image, Loader } from "lucide-react";

const NewsForm = ({ form, setForm, onSubmit, loading = false }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Article Title *
          </label>
          <div className="relative">
            <FileText size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Enter article title..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              value={form.title || ""}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Details/Content */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Article Content *
          </label>
          <textarea
            placeholder="Write your article content here..."
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 resize-vertical"
            rows="12"
            value={form.details || ""}
            onChange={e => setForm({ ...form, details: e.target.value })}
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            {(form.details || "").length} characters
          </p>
        </div>

        {/* Thumbnail URL */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Thumbnail Image URL
          </label>
          <div className="relative">
            <Image size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              placeholder="https://example.com/image.jpg"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              value={form.thumbnail_url || ""}
              onChange={e => setForm({ ...form, thumbnail_url: e.target.value })}
            />
          </div>
        </div>

        {/* Thumbnail Preview */}
        {form.thumbnail_url && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Thumbnail Preview
            </label>
            <div className="w-full h-32 bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={form.thumbnail_url}
                alt="Thumbnail preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm hidden">
                Invalid image URL
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg font-medium"
          >
            {loading ? (
              <>
                <Loader size={20} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={20} />
                Save News Article
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsForm;
