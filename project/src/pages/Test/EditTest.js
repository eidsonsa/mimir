import React from "react";
import { useParams } from "react-router";
import CreateOrEditTest from "../../components/CreateOrEditTest";

const EditTest = () => {
  const { testId } = useParams();

  return <CreateOrEditTest testId={testId} />;
};

export default EditTest;
