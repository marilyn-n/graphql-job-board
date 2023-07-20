import { gql } from '@apollo/client';

export const GET_JOBS_LIST = gql`
  query exampleJobsList {
    jobs {
      id
      title
      description
      date
      company {
        id
        name
      }
    } 
  }
`;

export const GET_JOB_BY_ID = gql`
  query exampleJobById($id: ID!) {
    job(id: $id) {
      id
      title
      date
      description
      company {
        id
        name
      }
    }
  }
`;

export const GET_COMPANY_BY_ID = gql`
 query exampleCompanyById($id: ID!) {
  company(id: $id) {
    id
    name
    description
    jobs {
      id
      date
      title
    }
  }
 }
`;

export const CREATE_JOB = gql`
  mutation($input: CreateJobInput!) {
    job: createJob(input: $input) {
      id
    }
  }
`;

export const REMOVE_JOB = gql`
  mutation($deleteJobId: ID!) {
    job: deleteJob(id: $deleteJobId) {
      id
      title
    }
  }
`;