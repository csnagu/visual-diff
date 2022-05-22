import React from "react";

import { createPatch } from "diff";
import { parse, html } from "diff2html";
import { DiffFile } from "diff2html/lib/types";

type diffValues = {
  oldContent: string;
  newContent: string;
  diffHtml: string;
};

class Differ extends React.Component<{}, diffValues> {
  constructor(props: diffValues) {
    super(props);
    this.state = {
      oldContent: "",
      newContent: "",
      diffHtml: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState((state) => ({ ...state, [name]: value }));
  };

  handleSubmit = (event: React.FormEvent): void => {
    const unifiedDiff: string = createPatch("Diff", this.state.oldContent, this.state.newContent);

    const diffFile: DiffFile[] = parse(unifiedDiff);
    const diffHtml: string = html(diffFile, {
      outputFormat: "side-by-side",
      drawFileList: false,
      diffStyle: "char",
    });

    this.setState((state) => ({ ...state, diffHtml: diffHtml }));
    event.preventDefault();
  };

  render() {
    return (
      <>
        <main>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn.jsdelivr.net/npm/diff2html/bundles/css/diff2html.min.css"
          />
          <form onSubmit={this.handleSubmit}>
            <span className="flex flex-row">
              <textarea
                name="oldContent"
                className="textarea-input"
                value={this.state.oldContent}
                onChange={this.handleInputChange}
              />
              <textarea
                name="newContent"
                className="textarea-input"
                value={this.state.newContent}
                onChange={this.handleInputChange}
              />
            </span>
            <span className="flex justify-center m-4">
              <input
                type="submit"
                value="Show Diff"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              />
            </span>
          </form>
          <div dangerouslySetInnerHTML={{ __html: this.state.diffHtml || "" }} />
        </main>
      </>
    );
  }
}

export default Differ;
