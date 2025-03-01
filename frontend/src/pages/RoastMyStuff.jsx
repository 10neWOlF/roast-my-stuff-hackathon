import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Zap, Code, AlertCircle, Check, Loader, ChevronLeft, Flame } from 'lucide-react';

const ROAST_LEVELS = {
  MILD: 'mild',
  SPICY: 'spicy',
  EXTRA_BURN: 'extra_burn'
};

function RoastMyStuff() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [projectDescription, setProjectDescription] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [roastLevel, setRoastLevel] = useState(ROAST_LEVELS.MILD);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('resume');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.type === 'application/pdf' ||
      selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Please select a valid PDF or DOCX file');
    }
  };

  const handleResumeSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('roastLevel', roastLevel);

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/roast-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // Navigate to the result page with the result data
      navigate('/result', { state: { result: {...response.data, roastLevel: roastLevel} } });
    } catch (error) {
      setError(error.response?.data?.error || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!projectDescription && !projectLink) {
      setError('Please provide a project description or a link');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/roast-project', {
        projectDescription, projectLink, roastLevel
      });
      // Navigate to the result page with the result data
      navigate('/result', { state: { result: {...response.data, roastLevel: roastLevel} } });
    } catch (error) {
      setError(error.response?.data?.error || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen font-sans flex flex-col text-white">
      <div className="container  ">
        <button
          onClick={handleGoBack}
          className="flex items-center cursor-pointer text-white transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
      </div>
      <header className="py-10 px-4 ">
      <div className="max-w-4xl mx-auto text-center">
  <div className="flex items-center justify-center gap-2">
    <h1 className="text-4xl font-bold text-white mb-2">Roast My Stuff</h1>
    <Flame className="w-12 h-12 text-orange-400" />
  </div>
  <p className="text-white text-opacity-90 text-lg max-w-xl mx-auto">
    Get a humorous yet helpful critique of your resume or project
  </p>
</div>

      </header>

      <main className="flex-1 py-2 px-4">
        <div className="max-w-xl mx-auto">
          <div className="flex mb-8 rounded-lg overflow-hidden shadow-md bg-gray-800">
            <button
              className={`flex-1 py-3 px-4 font-medium cursor-pointer transition-colors flex items-center justify-center ${activeTab === 'resume'
                ? 'bg-purple-600 text-white'
                : 'bg-zinc-950 text-gray-300 hover:bg-zinc-900'}`}
              onClick={() => setActiveTab('resume')}
            >
              <FileText size={18} className="mr-2" />
              Resume
            </button>
            <button
              className={`flex-1 py-3 px-4 font-medium cursor-pointer transition-colors flex items-center justify-center ${activeTab === 'project'
                ? 'bg-purple-600 text-white'
                : 'bg-zinc-950 text-gray-300 hover:bg-zinc-900'}`}
              onClick={() => setActiveTab('project')}
            >
              <Code size={18} className="mr-2" />
              Project
            </button>
          </div>

          <div className="bg-zinc-950 rounded-lg shadow-lg p-6 mb-8">
            {activeTab === 'resume' ? (
              <form onSubmit={handleResumeSubmit} className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-300 mb-4">Upload Your Resume</h2>

                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="resumeUpload"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="resumeUpload"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <Upload size={32} className="text-purple-500 mb-2" />
                    <span className="text-gray-300 font-medium">Drop your resume here or click to browse</span>
                    <span className="text-gray-500 text-sm mt-1">Accepts PDF or DOCX</span>
                  </label>
                  {file && (
                    <div className="mt-3 text-sm flex items-center justify-center text-gray-300">
                      <Check size={16} className="text-green-500 mr-1" />
                      <span>Selected: {file.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">
                    Roast Intensity
                  </label>
                  <select
                    value={roastLevel}
                    onChange={(e) => setRoastLevel(e.target.value)}
                    className="w-full border border-gray-700 rounded-lg p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-zinc-950"
                  >
                    <option value={ROAST_LEVELS.MILD}>Mild Roast 🔥</option>
                    <option value={ROAST_LEVELS.SPICY}>Spicy Roast 🔥🔥</option>
                    <option value={ROAST_LEVELS.EXTRA_BURN}>Extra Burn 🔥🔥🔥</option>
                  </select>
                </div>

                {error && (
                  <div className="bg-red-900 border-l-4 border-red-500 p-4 rounded">
                    <div className="flex items-center">
                      <AlertCircle size={20} className="text-red-500 mr-2" />
                      <p className="text-red-300">{error}</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-red-500 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-shadow flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader size={18} className="animate-spin mr-2" />
                      Roasting...
                    </>
                  ) : (
                    <>
                      <Zap size={18} className="mr-2" />
                      Roast My Resume
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleProjectSubmit} className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-300 mb-4">Share Your Project</h2>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">
                    Project Description
                  </label>
                  <textarea
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Tell us about your project..."
                    className="w-full border border-gray-700 rounded-lg p-3 text-gray-300 min-h-32 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-zinc-950"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">
                    Project Link
                  </label>
                  <input
                    type="url"
                    value={projectLink}
                    onChange={(e) => setProjectLink(e.target.value)}
                    placeholder="https://your-project-url.com"
                    className="w-full border border-gray-700 rounded-lg p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-zinc-950"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">
                    Roast Intensity
                  </label>
                  <select
                    value={roastLevel}
                    onChange={(e) => setRoastLevel(e.target.value)}
                    className="w-full border border-gray-700 rounded-lg p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-zinc-950"
                  >
                    <option value={ROAST_LEVELS.MILD}>Mild Roast 🔥</option>
                    <option value={ROAST_LEVELS.SPICY}>Spicy Roast 🔥🔥</option>
                    <option value={ROAST_LEVELS.EXTRA_BURN}>Extra Burn 🔥🔥🔥</option>
                  </select>
                </div>

                {error && (
                  <div className="bg-red-900 border-l-4 border-red-500 p-4 rounded">
                    <div className="flex items-center">
                      <AlertCircle size={20} className="text-red-500 mr-2" />
                      <p className="text-red-300">{error}</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-red-500 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-shadow flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader size={18} className="animate-spin mr-2" />
                      Roasting...
                    </>
                  ) : (
                    <>
                      <Zap size={18} className="mr-2" />
                      Roast My Project
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
        
      </main>
      <footer className=" py-4 mt-auto">
        <div className="container mx-auto px-2 text-center text-gray-400">
          <p>
            Roast My Stuff • Get brutally honest feedback with a sense of humor
          </p>
        </div>
      </footer>
      
    </div>
  );
}

export default RoastMyStuff;