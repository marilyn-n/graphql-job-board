import { useState } from 'react';
import { CREATE_JOB } from '../lib/graphql/queries';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';


function CreateJobPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [triggerCreateJobMutation, { data, loading, error }] = useMutation(CREATE_JOB, {
    variables: {
      input: { title, description }
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('should post a new job:', { title, description });
    const { data } = await triggerCreateJobMutation();
    const jobId = data.job.id
    if (!error) navigate(`/jobs/${jobId}`);
  };

  return (
    <div>
      <h1 className="title">
        New Job
      </h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">
              Title
            </label>
            <div className="control">
              <input className="input" type="text" value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Description
            </label>
            <div className="control">
              <textarea className="textarea" rows={10} value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJobPage;
