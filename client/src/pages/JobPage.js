import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { GET_JOB_BY_ID } from "../lib/graphql/queries";

function JobPage() {
  const { jobId } = useParams();

  const { loading, error, data } = useQuery(GET_JOB_BY_ID, {
    variables: { "id": jobId }
  });

  const [jobDetails, setJobDetails] = useState({});

  useEffect(() => {
    if (data) {
      setJobDetails(data.job)
    }
  }, [data, jobId]);

  if (loading) return <p>Loading ...</p>;
  if (error) return `Error! ${error}`;


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
    </div>
  );
}

export default JobPage;
