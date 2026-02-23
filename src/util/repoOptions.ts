import { ClientSession } from "mongoose";

type RepoOptions = {
  session?: ClientSession;
};

export default RepoOptions;