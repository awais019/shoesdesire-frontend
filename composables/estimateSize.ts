export const useEstimateSize = () => {
  function estimate(body: FormData) {
    return useFetch<{
      foot_length_in: number;
      foot_width_in: number;
    }>("http://localhost:8000/api/foot_size/", {
      method: "POST",
      body,
    });
  }

  return {
    estimate,
  };
};
