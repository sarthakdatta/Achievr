
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SubjectSelectorProps {
  selectedSubject: string | null;
  selectedCategory: string | null;
  onSubjectSelect: (subject: string) => void;
  onCategorySelect: (category: string) => void;
}

const SubjectSelector = ({ 
  selectedSubject, 
  selectedCategory, 
  onSubjectSelect, 
  onCategorySelect 
}: SubjectSelectorProps) => {
  const subjects = {
    Math: {
      color: "bg-blue-600",
      categories: [
        "Algebra",
        "Problem Solving and Data Analysis",
        "Advanced Math",
        "Geometry and Trigonometry"
      ]
    },
    "Reading and Writing": {
      color: "bg-green-600",
      categories: [
        "Information and Ideas",
        "Craft and Structure",
        "Expression of Ideas",
        "Standard English Conventions"
      ]
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Select Subject</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(subjects).map(([subject, config]) => (
            <Card 
              key={subject}
              className={`cursor-pointer border-2 transition-all duration-200 ${
                selectedSubject === subject 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-blue-100 hover:border-blue-300'
              }`}
              onClick={() => {
                onSubjectSelect(subject);
                onCategorySelect('');
              }}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-blue-900">{subject}</span>
                  <Badge className={config.color}>
                    {subjects[subject as keyof typeof subjects].categories.length} Topics
                  </Badge>
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {selectedSubject && (
        <div>
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Select Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects[selectedSubject as keyof typeof subjects].categories.map((category) => (
              <Card 
                key={category}
                className={`cursor-pointer border-2 transition-all duration-200 ${
                  selectedCategory === category 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-blue-100 hover:border-blue-300'
                }`}
                onClick={() => onCategorySelect(category)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-blue-900 text-lg">{category}</CardTitle>
                  <CardDescription>
                    Practice questions focused on {category.toLowerCase()}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectSelector;
