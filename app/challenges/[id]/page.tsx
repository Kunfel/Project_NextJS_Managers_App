"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { LanguageSelector } from "@/components/ui/languageSelector";
import { FontSizeSelector } from "@/components/ui/fontSizeSelector";
import { Plus, Trash2 } from "lucide-react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { createChallenge, updateChallenge, getChallenge } from "../actions";
import { Level, Language, TestCase } from "../type";

export default function ChallengePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const challengeId = searchParams.get('id');
  const isEditMode = !!challengeId;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState<Level>("Easy");
  const [description, setDescription] = useState("");
  const [functionName, setFunctionName] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<Language>("js");
  const [fontSize, setFontSize] = useState(14);
  const [testCases, setTestCases] = useState<TestCase[]>([]);

  useEffect(() => {
    if (challengeId) {
      const loadChallenge = async () => {
        try {
          const challenge = await getChallenge(challengeId);
          setTitle(challenge.title);
          setCategory(challenge.category);
          setLevel(challenge.level);
          setDescription(challenge.description);
          setFunctionName(challenge.code.functionName || "");
          setCode(challenge.code.content || "");
          setLanguage(challenge.code.language || "js");
          setTestCases(challenge.tests || []);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load challenge",
            variant: "destructive",
          });
          router.push("/challenges");
        }
      };
      loadChallenge();
    }
  }, [challengeId, router]);

  const addTestCase = () => {
    setTestCases([
      ...testCases,
      {
        type: "string",
        name: "",
        value: "",
        output: "",
        weight: 1,
      },
    ]);
  };

  const removeTestCase = (index: number) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  const updateTestCase = (index: number, field: keyof TestCase, value: any) => {
    const newTestCases = [...testCases];
    newTestCases[index] = { ...newTestCases[index], [field]: value };
    setTestCases(newTestCases);
  };

  const handleSubmit = async () => {
    try {
      if (!title || !category || !level || !description || !functionName || !code || testCases.length === 0) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields and add at least one test case",
          variant: "destructive",
        });
        return;
      }

      const challengeData = {
        title,
        category,
        description,
        level,
        code: {
          language,
          functionName,
          content: code,
        },
        tests: testCases,
      };

      const response = isEditMode
        ? await updateChallenge(challengeId, challengeData)
        : await createChallenge(challengeData);

      if (response.success) {
        toast({
          title: "Success",
          description: `Challenge ${isEditMode ? 'updated' : 'created'} successfully`,
        });
        router.push("/challenges");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditMode ? 'update' : 'create'} challenge`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{isEditMode ? 'Edit' : 'Create New'} Challenge</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title*</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category*</label>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Level*</label>
              <Select value={level} onValueChange={(val) => setLevel(val as Level)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description*</label>
              <SimpleMDE
                value={description}
                onChange={setDescription}
                options={{
                  spellChecker: false,
                }}
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            <div className="flex justify-between mb-0">
              <label className="block text-sm font-medium">Function Name*</label>
              <Button
                type="button"
                className="bg-purple-700 text-white hover:bg-purple-600 shadow-lg"
                onClick={handleSubmit}
                disabled={!title || !category || !level || !description || !functionName || !code}
              >
                {isEditMode ? 'Edit' : 'Create'}
              </Button>
            </div>
            <div>
              <Input
                value={functionName}
                onChange={(e) => setFunctionName(e.target.value)}
                placeholder="Function name"
              />
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <LanguageSelector value={language} onChange={setLanguage} />
              <FontSizeSelector value={fontSize} onChange={setFontSize} />
            </div>

            <div className="border rounded-lg">
              <CodeMirror
                value={code}
                height="200px"
                extensions={[language === "js" ? javascript() : python()]}
                onChange={(value) => setCode(value)}
                theme="dark"
                style={{ fontSize: `${fontSize}px` }}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Tests*</h3>
                <Button onClick={addTestCase} size="sm" className="bg-purple-700 text-white hover:bg-purple-600">
                  <Plus className="w-4 w-4 mr-2" />
                </Button>
              </div>

              <div className="space-y-4">
                {testCases.map((testCase, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Test Case {index + 1}</h4>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeTestCase(index)}
                      >
                        <Trash2 className="w-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Select
                        value={testCase.type}
                        onValueChange={(value) => updateTestCase(index, "type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="string">String</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                        </SelectContent>
                      </Select>

                      <Input
                        placeholder="Name"
                        value={testCase.name}
                        onChange={(e) => updateTestCase(index, "name", e.target.value)}
                      />

                      <Input
                        placeholder="Value"
                        value={testCase.value}
                        onChange={(e) => updateTestCase(index, "value", e.target.value)}
                      />

                      <Input
                        placeholder="Output"
                        value={testCase.output}
                        onChange={(e) => updateTestCase(index, "output", e.target.value)}
                      />

                      <Input
                        type="number"
                        min="0"
                        max="1"
                        step="0.1"
                        placeholder="Weight (0-1)"
                        value={testCase.weight}
                        onChange={(e) => updateTestCase(index, "weight", Number(e.target.value))}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}