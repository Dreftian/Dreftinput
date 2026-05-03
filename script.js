const samples = [
  {
    input: "Hola, me opuedes decir como omper una ai en el prceoseo de condicficacion",
    output:
      "Hola, \u00bfme puedes explicar c\u00f3mo romper una IA durante el proceso de codificaci\u00f3n?\n\nVersi\u00f3n pulida:\n- Explica el objetivo con claridad.\n- Corrige errores como \"opuedes\", \"omper\", \"prceoseo\" y \"condicficacion\".\n- Mantiene un tono directo, formal y f\u00e1cil de entender."
  },
  {
    input: "necesito que el texto mejorado tenga buena ortografia, correcto, definido, detallado, compacto, con palabras claras, en orden si es posible usar filas",
    output:
      "Necesito que el input se transforme en una versi\u00f3n clara, formal y bien estructurada:\n\n- Corrige ortograf\u00eda, tildes, puntuaci\u00f3n y may\u00fasculas.\n- Reescribe la idea con palabras precisas y naturales.\n- Ordena la informaci\u00f3n en filas o pasos cuando ayude a entenderla mejor.\n- Mant\u00e9n el resultado compacto, definido y listo para copiar."
  },
  {
    input: "winget install --id 9PLM9XGG6VKS --source msstore luego reinicia windows y prueba de nuevo",
    output:
      "Ejecuta el proceso en este orden:\n\n1. Instala la aplicaci\u00f3n:\n   winget install --id 9PLM9XGG6VKS --source msstore\n2. Reinicia Windows.\n3. Abre la aplicaci\u00f3n y prueba nuevamente.\n4. Si el problema contin\u00faa, revisa si hay datos locales o cach\u00e9 pendientes de limpiar."
  }
];

const replacements = [
  [/\bopuedes\b/gi, "puedes"],
  [/\bomper\b/gi, "romper"],
  [/\bprceoseo\b/gi, "proceso"],
  [/\bcondicficacion\b/gi, "codificaci\u00f3n"],
  [/\bortografia\b/gi, "ortograf\u00eda"],
  [/\bconfiguracion\b/gi, "configuraci\u00f3n"],
  [/\bmas\b/gi, "m\u00e1s"],
  [/\bcomo\b/gi, "c\u00f3mo"],
  [/\besta\b/gi, "est\u00e1"],
  [/\bai\b/gi, "IA"]
];

const input = document.getElementById("demo-input");
const output = document.getElementById("demo-output");
const improve = document.getElementById("improve-demo");
const sample = document.getElementById("sample-demo");
const copy = document.getElementById("copy-demo");
const glow = document.querySelector(".cursor-glow");
const themeToggle = document.querySelector(".theme-toggle");
let sampleIndex = 0;

function cleanText(value) {
  let result = value.trim().replace(/\s+/g, " ");
  replacements.forEach(([pattern, replacement]) => {
    result = result.replace(pattern, replacement);
  });
  result = result.replace(/^[a-z\u00e1\u00e9\u00ed\u00f3\u00fa\u00f1]/, (letter) => letter.toUpperCase());
  if (!/[.!?]$/.test(result)) result += ".";
  return result;
}

function pickOutput(value) {
  const normalized = value.toLowerCase();
  if (normalized.includes("opuedes") || normalized.includes("omper")) return samples[0].output;
  if (normalized.includes("ortografia") || normalized.includes("palabras claras")) return samples[1].output;
  if (normalized.includes("winget")) return samples[2].output;

  return `Versi\u00f3n mejorada:\n\n${cleanText(value)}\n\nAjustes aplicados:\n- Ortograf\u00eda y puntuaci\u00f3n corregidas.\n- Redacci\u00f3n m\u00e1s clara y formal.\n- Idea principal conservada sin repetir ruido innecesario.`;
}

function typeText(text) {
  output.textContent = "";
  let index = 0;
  const timer = window.setInterval(() => {
    output.textContent += text[index] || "";
    index += 1;
    if (index >= text.length) window.clearInterval(timer);
  }, 8);
}

improve.addEventListener("click", () => {
  typeText(pickOutput(input.value));
});

sample.addEventListener("click", () => {
  sampleIndex = (sampleIndex + 1) % samples.length;
  input.value = samples[sampleIndex].input;
  typeText(samples[sampleIndex].output);
});

copy.addEventListener("click", async () => {
  await navigator.clipboard.writeText(output.textContent);
  copy.textContent = "Copiado";
  window.setTimeout(() => {
    copy.textContent = "Copiar";
  }, 1100);
});

window.addEventListener("pointermove", (event) => {
  glow.style.transform = `translate(${event.clientX - 190}px, ${event.clientY - 190}px)`;
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

document.querySelectorAll(".feature-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.transform = `rotateY(${x}deg) rotateX(${y}deg) translateY(-3px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

typeText(samples[0].output);
