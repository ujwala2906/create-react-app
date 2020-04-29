const manageToolCms = {
    addNewTool: "Add New Tool"
}

const subscriptionCms = {
    stages: "STEP 2 OF 2",
    toolHead: "Tell us about the Subscription",
    markets: "Does this subscription cover access for multiple markets",
    notes: "Additional Notes/Comments",
    accessType: "Please select access type",
    selectCountries: "Apply the same access across all selected countries ?",
    seats: "Number of seats:",
    limit: "If limited, please nominate a super user who currently has access :",
    email: "If applicable, Please enter email contact",
    instructions: `If applicable, please provide general instructions regarding the contact information, (i.e. "Your iProspect Lead" or "Your Google account rep" etc.).`,
    whiteList: "If whitelist, please nominate a super user who currently has access :",
    accessTypeArray: [
        { title: "Limited Log-Ins Available", key: "limit" },
        { title: "Contact Required For Setup", key: "contact" },
        { title: "Enterprise Access/ Registration With Dentsu Email", key: "access" },
        { title: "Whitelist", key: "whitelist" },
        { title: "Only Website Link Required, No Log-In Necessary", key: "website" }
    ],
    customize: "No(Please Customize Access In The Grid Below)"
}

const toolCms = {
    stages: "STEP 1 OF 2",
    aboutTool: "Tell us about the Tool",
    toolName: "Tool Name",
    chooseLogo: "Choose logo",
    websiteUrl: `If applicable, please provide the website URL by copying it from
    your browser and pasting the link below. This should link to the
    tool's homepage or log-in screen`,
    description: "Description",
    insight: "What type of insights does this tool provide? Please check all that apply.",
    type: "What type of data does the tool have ? Please check all that apply",
    uploadScreenShots: "Please upload screenshots for preview of the tool.",
    chooseImage: "Choose image",
    limit: "Please identify if the tool's data set is global or limited to specific countries?",
    emailContact: "Please provide email contact information for the tool. This will likely be the agency's account representative",
    questions: "Please add 1-2 examples of question this tool could answer.",
    insightType: "Select at least one Insight Type",
    dataType: "Select at least one Data Type",
    countries: "Select Countries",
    globalRegion: "Global",
    insightArray: [
        "Audience",
        "Culture & Trends",
        "Media",
        "Business Intelligence",
        "Category & Competitive",
    ],
    typeArray: [
        "Behavioral",
        "Search",
        "Sales",
        "Data Analysis/Reports",
        "Social",
        "Panel/Survey",
        "Competitive",
    ],
    validation: {
        size: "Maximum upload file size : 2MB",
        fileType: "Invalid File Type"
    }
};
const placeholder = {
    searchTool: "Search for tool",
    noFileChosen: "No file chosen",
    enterYourText: "Enter your text",
};

const validation = {
    toolName: "Tool Name is required",
    toolLength: "Tool name must be at most 50 characters",
    url: "viewUrl must be a valid URL",
    description: "Description Name is required",
    minLength: " Description must have at least 50 characters",
    maxLength: "Description must be at most 300 characters",
    region:"Region is Required",
    accessType:"Select at least one access type",
    seat: "seats is required field",
    contactField: "Select at least one contact field",
    instruction:"General Instruction is required",
    submission: "Your Submission has been Received",
}

const country = [
    { title: 'Afghanistan' },
    { title: 'Albania' },
    { title: 'Algeria' },
    { title: 'Andorra' },
    { title: 'Angola' },
    { title: 'Argentina' },
    { title: 'Armenia' },
    { title: 'Australia' },
    { title: 'Austria' },
    { title: 'Azerbaijan' },
    { title: 'Bahamas' },
    { title: 'Bahrain' },
    { title: 'Bangladesh' },
    { title: 'Barbados' },
    { title: 'Belarus' },
    { title: 'Belgium' },
    { title: 'Belize' },
    { title: 'Benin' },
    { title: 'Bhutan' },
    { title: 'Bolivia' },
    { title: 'Botswana' },
    { title: 'Brazil' },
    { title: 'Brunei' },
    { title: 'Bulgaria' },
    { title: 'Burkina Faso' },
    { title: 'Burundi' },
    { title: 'Cambodia' },
    { title: 'Cameroon' },
    { title: 'Canada' },
    { title: 'Colombia' },
    { title: 'Comoros' },
    { title: 'Croatia' },
    { title: 'Cuba' },
    { title: 'Cyprus' },
    { title: 'Denmark' },
    { title: 'Djibouti' },
    { title: 'Dominica' },
    { title: 'Ecuador' },
    { title: 'Egypt' },
    { title: 'El Salvador' },
    { title: 'Eritrea' },
    { title: 'Estonia' },
    { title: 'Ethiopia' },
    { title: 'Fiji' },
    { title: 'Finland' },
    { title: 'France' },
    { title: 'Gabon' },
    { title: 'Gambia' },
    { title: 'Georgia' },
    { title: 'Germany' },
    { title: 'Ghana' },
    { title: 'Greece' },
    { title: 'Grenada' },
    { title: 'Guatemala ' },
    { title: 'Iceland' },
    { title: 'India' },
    { title: 'Iraq' }

];
export { manageToolCms, subscriptionCms, toolCms, placeholder, country, validation }