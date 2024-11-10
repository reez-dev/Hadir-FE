// import RsAPI from "@/core/services/rs_api";
// import { FormProps } from "@/core/types/form_props";
// import { useEffect, useState } from "react";

// export default function CheckboxInput(props: FormProps<string[]>) {
//   const { fieldProps, modifier } = props;
//   const [checkboxOptions, setCheckboxOptions] = useState(
//     modifier.options || []
//   );

//   useEffect(() => {
//     if (fieldProps.apiEndpoint) {
//       RsAPI<string[]>()
//         .get({
//           url: fieldProps.apiEndpoint,
//         })
//         .then((data) => setCheckboxOptions(data))
//         .catch((error) =>
//           console.error("Error fetching checkbox options:", error)
//         );
//     }
//   }, [fieldProps.apiEndpoint]);

//   const handleCheckboxChange = (option: string) => {
//     const updatedValue = fieldProps.value!.includes(option)
//       ? fieldProps.value!.filter((item) => item !== option)
//       : [...fieldProps.value!, option];
//     modifier.onChange(updatedValue);
//   };

//   return (
//     <div className="form-group">
//       <label>{fieldProps.label}</label>
//       {checkboxOptions.map((option, index) => (
//         <div key={index}>
//           <input
//             type="checkbox"
//             id={`${fieldProps.name}-${option}`}
//             name={fieldProps.name}
//             value={option}
//             checked={fieldProps.value!.includes(option)}
//             onChange={() => handleCheckboxChange(option)}
//           />
//           <label htmlFor={`${fieldProps.name}-${option}`}>{option}</label>
//         </div>
//       ))}
//       {fieldProps.error && <p className="error">{fieldProps.error}</p>}
//     </div>
//   );
// }
