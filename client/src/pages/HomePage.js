import React, { useState, useEffect } from 'react';
import JobList from '../components/JobList';
import { useQuery } from '@apollo/client';
import { GET_JOBS } from '../lib/graphql/queries';

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setjobsPerPage] = useState(10);

  const { data, error, loading } = useQuery(GET_JOBS, {
    variables: { limit: jobsPerPage, offset: (currentPage - 1) * jobsPerPage },
    fetchPolicy: 'network-only', // Doesn't check cache before making a network request
  });
  const [jobs, setJobs] = useState([]);
  const totalPages = Math.ceil(jobs.totalCount / jobsPerPage);

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
      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
      <JobList jobs={jobs.items} />
    </div>
  );
}

export default HomePage;
