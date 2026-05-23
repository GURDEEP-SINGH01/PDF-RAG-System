import { useState } from "react";

const PdfUploader = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {

        const selectedFile = e.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {

        if (!file) {
            alert("Please select a PDF");
            return;
        }

        const formData = new FormData();

        formData.append("pdf", file);

        try {

            const response = await fetch(
                "http://localhost:3000/upload/pdf",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            console.log(data);

            alert("PDF uploaded successfully");

        } catch (error) {

            console.error(error);

            alert("Upload failed");
        }
    };

    return (
        // <div className="h-full flex flex-col">

        //     <h1 className="text-3xl font-bold">
        //         PDF Agent
        //     </h1>

        //     <p className="text-zinc-400 mt-2">
        //         Upload PDFs and chat with AI
        //     </p>

        //     <div className="mt-10 border-2 border-dashed border-zinc-700 rounded-3xl p-10 flex flex-col items-center justify-center text-center bg-zinc-950">

        //         <div className="text-5xl">
        //             📄
        //         </div>

        //         <h2 className="mt-4 text-xl font-semibold">
        //             <span>Upload PDF</span>
        //         </h2>

        //         <p className="text-sm text-zinc-500 mt-2">
        //             <span> Drag & drop or choose file</span>
        //         </p>

        //         <button className="mt-6 bg-white text-black px-5 py-3 rounded-2xl font-medium hover:scale-105 transition">
        //             <span>Choose File</span>
        //         </button>
        //     </div>

        // </div>
        <div className="h-full flex flex-col">

            <h1 className="text-3xl font-bold">
                PDF Agent
            </h1>

            <p className="text-zinc-400 mt-2">
                Upload PDFs and chat with AI
            </p>

            <div className="mt-10 border-2 border-dashed border-zinc-700 rounded-3xl p-10 flex flex-col items-center justify-center text-center bg-zinc-950  w-full overflow-hidden">

                <div className="text-5xl">
                    📄
                </div>

                <h2 className="mt-4 text-xl font-semibold">
                    Upload PDF
                </h2>

                <p className="text-sm text-zinc-500 mt-2">
                    Select a PDF document to index
                </p>

                {/* Hidden Input */}
                <input
                    type="file"
                    accept=".pdf"
                    id="pdf-upload"
                    className="hidden"
                    onChange={handleFileChange}
                />

                {/* Choose File Button */}
                <label
                    htmlFor="pdf-upload"
                    className="mt-6 bg-white text-black px-5 py-3 rounded-2xl font-medium cursor-pointer hover:scale-105 transition"
                >
                    Choose PDF
                </label>

                {/* File Name */}
                {
                    file && (
                        <div className="mt-4 text-sm text-zinc-300">
                            Selected:
                            <span className="text-white font-medium ml-2">
                                {file.name}
                            </span>
                        </div>
                    )
                }

                {/* Upload Button */}
                <button
                    onClick={handleUpload}
                    className="mt-6 w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-2xl transition"
                >
                    Upload PDF
                </button>

            </div>

        </div>
    )
}

export default PdfUploader