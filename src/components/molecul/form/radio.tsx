// import RsAPI from "@/core/services/rs_api";
// import { FormProps } from "@/core/types/form_props";
// import { useEffect, useState } from "react";

// export default function RadioInput(props: FormProps<string>) {
//   const { field, fieldProps, modifier } = props;
//   const [radioOptions, setRadioOptions] = useState(modifier.options || []);

//   useEffect(() => {
//     if (fieldProps.apiEndpoint) {
//       RsAPI<string[]>()
//         .get({
//           url: fieldProps.apiEndpoint,
//         })
//         .then((data) => setRadioOptions(data))
//         .catch((error) =>
//           console.error("Error fetching radio options:", error)
//         );
//     }
//   }, [fieldProps.apiEndpoint]);

//   return (
//     <div className="form-group">
//       <label>{fieldProps.label}</label>
//       {radioOptions.map((option, index) => (
//         <div key={index}>
//           <input
//             type="radio"
//             id={field}
//             name={fieldProps.name}
//             value={option}
//             checked={fieldProps.value === option}
//             onChange={() => modifier.onChange(option)}
//           />
//           <label htmlFor={field}>{option}</label>
//         </div>
//       ))}
//       {fieldProps.error && <p className="error">{fieldProps.error}</p>}
//     </div>
//   );
// }
