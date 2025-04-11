import React from 'react';

const UploadVideo = () => {
  return (
    <div>
      <h2>Upload a Sustainability Video</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Video Title</label>
          <input type="text" className="form-control" placeholder="Enter title" />
        </div>
        <div className="mb-3">
          <label className="form-label">Tags</label>
          <input type="text" className="form-control" placeholder="e.g., climate, pollution" />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Video</label>
          <input type="file" className="form-control" />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
};

export default UploadVideo;
