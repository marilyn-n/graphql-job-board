import { getJobs, getJob, getJobsByCompany } from "./db/jobs.js";
import { getCompany } from "./db/companies.js";

export const resolvers = {
    Query: {
        job: (_root, args) => getJob(args.id),
        jobs: () => getJobs(),
        company: (_root, args) => getCompany(args.id),
    },

    Company: {
        jobs: (company) => getJobsByCompany(company.id),
    },

    Job: {
        company: (job) => getCompany(job.companyId),
        date: (job) => toIsoDate(job.createdAt),
    },

}

const toIsoDate = (value) => value.slice(0, 'yyyy-mm-dd'.length);