import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { GET_COMPANY_BY_ID } from "../lib/graphql/queries";
import JobList from '../components/JobList';

function CompanyPage() {
  const { companyId } = useParams();
  const { data, error, loading } = useQuery(GET_COMPANY_BY_ID, {
    variables: { id: companyId }
  });
  const [companyDetails, setCompanyDetails] = useState({});

  useEffect(() => {
    if (data) {
      setCompanyDetails(data.company);
    }
  }, [data, companyId])

  if (loading) return 'Loading...'
  if (error) return `Error: ${error}`

  console.log(companyDetails);

  return (
    <div>
      <h1 className="title">
        {companyDetails.name}
      </h1>
      <div className="box">
        {companyDetails.description}
      </div>
      <h2 className='title is-5'>
        Jobs at {companyDetails.name}
      </h2>
      <JobList jobs={companyDetails.jobs} />
    </div>
  );
}

export default CompanyPage;
