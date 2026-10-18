"use strict";

const yearElement = document.querySelector("#current-year");
if (yearElement) yearElement.textContent = String(new Date().getFullYear());

const resumeLink = document.querySelector("#resume-link");
const resumeStatus = document.querySelector("#resume-status");

async function checkResume() {
  if (!resumeLink || !resumeStatus) return;
  if (window.location.protocol === "file:") {
    resumeStatus.textContent = "To enable the resume download, preview with Live Server and add your PDF as resume.pdf beside index.html.";
    return;
  }

  try {
    const response = await fetch(new URL("resume.pdf", window.location.href), { method: "HEAD" });
    const contentType = response.headers.get("content-type") || "";
    const isPdf = contentType.includes("application/pdf");
    if (response.ok && isPdf) {
      resumeLink.hidden = false;
      resumeStatus.hidden = true;
      return;
    }
    if (response.ok && !isPdf) {
      resumeStatus.textContent = "The resume.pdf path is present but is not being served as a PDF. Check the file and server configuration.";
      return;
    }
    if (response.status !== 404) {
      resumeStatus.textContent = "Your resume could not be checked. Confirm that resume.pdf is available from the site folder.";
    }
  } catch (error) {
    // Local file previews do not support fetch; Live Server does.
    resumeStatus.textContent = "To enable the resume download, preview with Live Server and add your PDF as resume.pdf beside index.html.";
  }
}

checkResume();
