import { gql } from '@apollo/client';

const jobDetailFragment = gql`

fragment jobDetail on Job {
  id
  title
  description
  date
  canRemove
  company {
    id
    name
  }
}

`;

export const GET_JOBS = gql`
  query exampleJobsList($limit: Int, $offset: Int) {
    jobs(limit: $limit, offset: $offset) {
      items {
        ...jobDetail
      }
      totalCount
    } 
  }
  ${jobDetailFragment}
`;

export const GET_JOB_BY_ID = gql`
  query exampleJobById($id: ID!) {
    job(id: $id) {
      ...jobDetail
    }
  }
  ${jobDetailFragment}
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
  mutation exampleCreateJob($input: CreateJobInput!) {
    job: createJob(input: $input) {
      id
    }
  }
`;

export const REMOVE_JOB = gql`
  mutation exampleRemoveJob($deleteJobId: ID!) {
    job: deleteJob(id: $deleteJobId) {
      id
      title
    }
  }
`;