document.getElementById("themeToggle").onclick = () => {
  const light = document.documentElement.classList.toggle("light");
  localStorage.theme = light ? "light" : "dark";
};

const pipelines = [
  "auth_request -> rate_limiter -> captcha -> session",
  "job_description -> parse -> extract_skills -> skill_list",
  "resume -> skill_extraction -> skill_matching -> compatibility_score",
  "skill_list -> Question_gen_agent -> interview_questions",
];

const tickerEl = document.getElementById("tickerText");

async function runTicker() {
  let i = 0;
  while (true) {
    const line = pipelines[i % pipelines.length];

      await typeText(line);
      await wait(1800);
      await eraseText();
    i++;
  }
}

function typeText(text) {
  return new Promise((resolve) => {
    let i = 0;
    const interval = setInterval(() => {
      tickerEl.textContent = text.slice(0, i);
      i++;
      if (i > text.length) {
        clearInterval(interval);
        resolve();
      }
    }, 35);
  });
}

function eraseText() {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const current = tickerEl.textContent;
      tickerEl.textContent = current.slice(0, -1);
      if (current.length === 0) {
        clearInterval(interval);
        resolve();
      }
    }, 20);
  });
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

runTicker();