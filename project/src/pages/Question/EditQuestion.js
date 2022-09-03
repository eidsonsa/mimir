import React from "react";
import { useParams } from "react-router";
import CreateOrEditQuestion from "../../components/CreateOrEditQuestion";

const EditQuestion = () => {
  const { questionId } = useParams();

  return <CreateOrEditQuestion questionId={questionId} />;
};

export default EditQuestion;
