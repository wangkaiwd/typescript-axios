import axios from "./axios";

// 1. axios can invoke as a function directly
// 2. axios is an object support http verb method

// export all typescript types for consumer, otherwise consumer can't find correspond type location
export * from "./types";

export default axios;
