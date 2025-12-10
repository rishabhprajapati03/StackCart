import React from "react";
import { PRODUCT_Q_AND_A } from "../../utils/constants";

const ProductQaA = () => {
  console.log(PRODUCT_Q_AND_A);
  return (
    <div className="mt-2 md:mt-4 border border-gray-500/50">
      <h2 className="p-2 text-xl font-semibold">FAQ's</h2>
      <hr className="text-gray-500/50" />
      <div className="p-2">
        {PRODUCT_Q_AND_A.map((data) => {
          return (
            <div key={data.question} className="mb-3">
              <h4 className="font-semibold">Q. {data.question}</h4>
              <h5 className="text-gray-300">
                <b className="text-white">A. </b> {data.answer}
              </h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductQaA;
