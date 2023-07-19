import React, { useState, useEffect } from 'react';
import JobList from '../components/JobList';
import { useQuery } from '@apollo/client';
import { GET_JOBS_LIST } from '../lib/graphql/queries';

function HomePage() {
  const { data, error, loading } = useQuery(GET_JOBS_LIST);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (data && data.jobs) {
      setJobs(data.jobs);
    }
  }, [data]);

  if (!jobs) return 'Loading...';
  if (error) return 'Graphql: Something went wrong';

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
