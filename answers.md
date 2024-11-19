### *1) Please share any functionality you wish you could have completed in the previous step and how you would have completed it.*

One functionality I wish I could have added is **auto-saving user input** to prevent data loss in case of unexpected issues. This could be implemented by saving the form data in local storage or an external database at regular intervals.

Other functionalities I would have liked to add:
- **Field-level validation feedback**: Instant feedback on each field as the user types to quickly alert them to errors.
- **Form progress indicator**: A progress bar or step indicator to show users how far along they are in completing the form.

These features would enhance user experience by providing more robust data handling and clearer guidance during form completion.

---

### *2) Discuss how the delay in validating the address fields might affect user experience, and provide strategies for minimizing its impact.*

**Potential Impacts:**
- User frustration may arise from delayed feedback, making users question whether the form is functioning correctly.
- Reduced efficiency can occur as users spend extra time waiting for validation.
- Higher error rates may result when incorrect inputs are not caught immediately.

**Strategies to Minimize the Impact:**
- Use visual cues, such as loading spinners or animations, to indicate validation is in progress and keep users informed.
- Allow users to continue filling out other fields while asynchronous validation is performed on a specific field.
- Provide immediate feedback for simple errors using client-side validation while deferring complex checks to later stages.
- Validate multiple fields collectively at submission to reduce the perception of delay from individual field validations.

---

### *3) Explain how you would handle more complex form validation scenarios, such as conditional validation based on the values of other fields. For example, if we had input fields for adding the users’ address, and the postal code format needed to change according to the country selection (5 digits for the US and 6 letters and numbers separated by a space for Canada).*

When postal code formats depend on the selected country, such as 5 digits for the US or 6-character alphanumeric for Canada, a dynamic approach is required.

**Steps to Handle Conditional Validation:**
- Define validation rules that dynamically adjust based on the selected country, ensuring correctness for each format.
- Revalidate dependent fields like postal code whenever the country value changes to apply the correct validation logic.
- Provide user guidance through placeholder formats or tooltips that clarify the expected input format for the selected country.
- Use fallback rules for unsupported or unselected countries with minimal requirements and flag these cases for manual review if needed.
- Use **React Hook Form** to manage the form state and validation efficiently. Its lightweight structure and dynamic field validation capabilities are well-suited for complex scenarios.
- Leverage **Zod** to define a schema that adapts dynamically based on the selected country. Zod's `refinement` and `conditional` validation features make it ideal for creating context-specific validation rules.
- Implement dynamic validation rules where the postal code format adjusts automatically based on the country field value. For example, the schema can enforce a 5-digit postal code for the US and a 6-character alphanumeric format for Canada.
- Revalidate dependent fields like postal code when the country changes to ensure validation remains consistent with the selected country.


**Enhancements for Better UX:**
- Tailored error messages should clearly indicate what is wrong with the input, based on the context of the selected country.
- Edge case testing, such as switching countries mid-input, ensures the form adjusts dynamically without losing prior data. This guarantees a smooth user experience even in complex scenarios.
