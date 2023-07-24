import { getJobs, getJob, getJobsByCompany, createJob, deleteJob, updateJob } from "./db/jobs.js";
import { getCompany } from "./db/companies.js";
import { GraphQLError } from "graphql";

export const resolvers = {
    Query: {
        // args described in schema = {id}
        job: async (_root, args) => {
            const job = await getJob(args.id);
            if (!job) throw notFoundError('No Job found with id ' + args.id);
            return job;
        },
        jobs: (_root, { limit }) => {
            return getJobs(limit);
        },
        company: async (_root, args) => {
            const company = await getCompany(args.id);
            if (!company) throw notFoundError('No Company found with id ' + args.id);
            return company;
        },
        jobsCount: async () => {
            const jobsArray = await getJobs();
            return jobsArray.length;
        }
    },

    Company: {
        // Company resolvers only
        jobs: (company) => getJobsByCompany(company.id),
        isHiring: async (company, args, ctx) => {
            const jobsArr = await getJobsByCompany(company.id);
            return jobsArr.length ? true : false;
        }
    },

    Job: {
        // Job resolvers only
        company: (job, _args, { companyLoader }) => {
            return companyLoader.load(job.companyId)
        },
        date: (job) => toIsoDate(job.createdAt),
        canRemove: (job, args, context) => job.companyId === context.user.companyId,
    },

    Mutation: {
        // Mutations only
        // args described in schema = {title, description}
        /* Destructuring input from args and destructuring title and description from input */
        // third argument is context (_root, args, context)
        createJob: (_root, { input: { title, description } }, { user }) => {
            if (!user) throw unauthorizedError('Unauthorized: Missing authentication');
            return createJob({ companyId: user.companyId, title, description });
        },
        // destructuring { id } from args
        deleteJob: async (_root, { id }, { user }) => {
            if (!user) throw unauthorizedError('Unauthorized: Missing authentication');
            const job = await deleteJob(id, user.companyId);
            if (!job) { throw notFoundError('No Job found with id ' + id) };
            return job;
        },
        updateJob: async (_root, { input: { id, title, description } }, { user }) => {
            if (!user) throw unauthorizedError('Unauthorized: Missing authentication');
            const job = await updateJob({ id, title, description, companyId: user.companyId });
            if (!job) throw notFoundError('No Job found with id ' + id);
            return job;
        }
    }

}

const toIsoDate = (value) => value.slice(0, 'yyyy-mm-dd'.length);

const notFoundError = (message) => {
    return new GraphQLError(message, {
        extensions: { code: 'NOT_FOUND' }
    });
}

const unauthorizedError = (message) => {
    return new GraphQLError(message, {
        extensions: { code: 'UNAUTHENTICATED' }
    })
}