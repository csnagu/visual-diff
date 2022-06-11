import React, { useEffect, useState } from "react";

import { createPatch } from "diff";
import { parse, html } from "diff2html";
import { DiffFile } from "diff2html/lib/types";

type diffValues = {
  oldContent: string;
  newContent: string;
  diffHtml: string;
};

const Differ = () => {
  const [state, setState] = useState<diffValues>({
    oldContent: "",
    newContent: "",
    diffHtml: "",
  });

  const updateDiffHtml = (): void => {
    const unifiedDiff: string = createPatch("Diff", state.oldContent, state.newContent);
    const diffFile: DiffFile[] = parse(unifiedDiff);
    const diffHtmlResult: string = html(diffFile, {
      outputFormat: "side-by-side",
      drawFileList: false,
      diffStyle: "char",
    });

    setState({ ...state, diffHtml: diffHtmlResult });
  };

  useEffect(() => {
    updateDiffHtml();
  }, [state.newContent, state.oldContent]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const DeclareDiffCss = (): JSX.Element => (
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/diff2html/bundles/css/diff2html.min.css"
    />
  );

  return (
    <>
      <main>
        <DeclareDiffCss />
        <span className="flex flex-row">
          <textarea
            name="oldContent"
            className="textarea-input"
            value={state.oldContent}
            onChange={handleChange}
          />
          <textarea
            name="newContent"
            className="textarea-input"
            value={state.newContent}
            onChange={handleChange}
          />
        </span>
        <div dangerouslySetInnerHTML={{ __html: state.diffHtml || "<p>Preview Here...</p>" }} />
      </main>
    </>
  );
};

export default Differ;
