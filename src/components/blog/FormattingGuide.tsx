
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const FormattingGuide = () => {
  const examples = [
    {
      syntax: "# Your Title",
      result: "Large Title (H1)",
      description: "Use for main titles. Will be styled as text-3xl, bold, with margin bottom.",
      example: '<h1 class="text-3xl font-bold mb-6">Your Title</h1>'
    },
    {
      syntax: "## Your Subtitle",
      result: "Medium Title (H2)",
      description: "Use for section titles. Will be styled as text-2xl, bold, with margin bottom.",
      example: '<h2 class="text-2xl font-bold mb-4">Your Subtitle</h2>'
    },
    {
      syntax: "### Your Small Title",
      result: "Small Title (H3)",
      description: "Use for subsection titles. Will be styled as text-xl, semibold, with margin bottom.",
      example: '<h3 class="text-xl font-semibold mb-2">Your Small Title</h3>'
    },
    {
      syntax: "Normal paragraph text\nwith multiple lines",
      result: "Paragraph Text",
      description: "Regular paragraphs will be justified, with proper spacing and gray color.",
      example: '<p class="mb-4">Normal paragraph text<br />with multiple lines</p>'
    }
  ];

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Formatting Guide</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="text-gray-600">
            Write your content in plain text using the following syntax. The system will automatically format it with consistent styling:
          </p>
          
          <div className="grid gap-6">
            {examples.map((example, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">{example.result}</h4>
                    <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                      {example.syntax}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-2">{example.description}</p>
                    <div className="bg-gray-50 p-3 rounded font-mono text-sm break-all">
                      {example.example}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg mt-6">
            <div className="text-blue-800">
              <strong>Tips:</strong>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Use double line breaks (press Enter twice) to create new paragraphs</li>
                <li>Use # symbols at the start of a line for titles (more # means smaller title)</li>
                <li>All paragraphs will automatically be justified and properly spaced</li>
                <li>The system will maintain consistent styling across all blog posts</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormattingGuide;
