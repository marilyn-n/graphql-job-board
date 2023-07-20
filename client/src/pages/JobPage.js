import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { GET_JOB_BY_ID, REMOVE_JOB } from "../lib/graphql/queries";
import { useNavigate } from 'react-router-dom';

function JobPage() {

  const navigate = useNavigate();
  const { jobId } = useParams();

  const { loading, error, data } = useQuery(GET_JOB_BY_ID, {
    variables: { "id": jobId }
  });
  const [triggerRemoveJobMutation, { isLoading, hasError, result }] = useMutation(REMOVE_JOB, {
    variables: { "deleteJobId": jobId }
  });
  const [jobDetails, setJobDetails] = useState({});

  const handleJobRemove = async (id) => {
    triggerRemoveJobMutation();
    navigate("/");
  }

  useEffect(() => {
    if (data) {
      setJobDetails(data.job)
    }
  }, [data, jobId]);

  if (loading) return <p>Loading ...</p>;
  if (error || hasError) return `Error! ${error}`;

  return (
    <div>
      <h1 className="title is-2">
        {jobDetails.title}
      </h1>
      <h2 className="subtitle is-4">
        <Link to={`/companies/${jobDetails.company?.id}`}>
          {jobDetails.company?.name}
        </Link>
      </h2>
      <div className="box">
        <div className="block has-text-grey">
          Posted: {jobDetails.date}
        </div>
        <p className="block">
          {jobDetails.description}
        </p>
      </div>
      <div>
        <button onClick={(jobId) => handleJobRemove(jobId)}>Remove</button>
      </div>

    </div>
  );
}

export default JobPage;
