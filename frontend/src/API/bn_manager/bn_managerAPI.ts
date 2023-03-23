import { commonApi } from "../baseURL";
import {
  IBNData,
  IBNDataNames,
  ISample,
  ISampleNetworkNode,
} from "./bn_managerType";

const BASE_URL = "bn_manager/";

export const bn_managerAPI = commonApi.injectEndpoints({
  endpoints: (build) => ({
    // get networks data
    getBNData: build.query<IBNData, { owner: string }>({
      query: ({ owner }) => ({
        url: `${BASE_URL}get_BN/${owner}`,
      }),
      providesTags: ["Networks"],
    }),

    // get networks names
    getBNDataNames: build.query<IBNDataNames, { owner: string }>({
      query: ({ owner }) => ({
        url: `${BASE_URL}get_BN_names/${owner}`,
      }),
      providesTags: ["Networks"],
    }),

    // get sample data for network node
    getSampleNodeData: build.query<ISample, ISampleNetworkNode>({
      query: ({ owner, net_name, dataset_name, node }) => ({
        url: `${BASE_URL}get_graph_data/${owner}/${net_name}/${dataset_name}/${node}`,
      }),
      providesTags: ["Networks"],
    }),

    // remove network
    removeBN: build.mutation<unknown, { owner: string; name: string }>({
      query: ({ owner, name }) => ({
        url: `${BASE_URL}remove/${owner}/${name}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Networks"],
    }),
  }),
});
