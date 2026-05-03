const samples = [
  {
    input: "Hola, me opuedes decir como omper una ai en el prceoseo de condicficacion",
    output: "Hola, ¿me puedes decir cómo romper una IA en el proceso de codificación?"
  },
  {
    input: "necesito que el texto mejorado tenga buena ortografia, correcto, definido, detallado, compacto, con palabras claras, en orden si es posible usar filas",
    output: "Necesito que el input se transforme en una versión realmente mejorada:\n\n- Corrige la ortografía, las tildes y la puntuación.\n- Aclara la idea principal sin repetir el texto original palabra por palabra.\n- Ordena la información en frases o filas cuando ayude a entenderla mejor.\n- Mantén un tono formal, directo y compacto."
  },
  {
    input: "winget install --id 9PLM9XGG6VKS --source msstore luego reinicia windows y prueba de nuevo",
    output: "Ejecuta los pasos en este orden:\n\n1. winget install --id 9PLM9XGG6VKS --source msstore\n2. Reinicia Windows.\n3. Abre Codex y vuelve a probar."
  }
];

const input = document.getElementById("demo-input");
const output = document.getElementById("demo-output");
const improve = document.getElementById("improve-demo");
const sample = document.getElementById("sample-demo");
const copy = document.getElementById("copy-demo");
const glow = document.querySelector(".cursor-glow");
const themeToggle = document.querySelector(".theme-toggle");
let sampleIndex = 0;

function pickOutput(value) {
  const normalized = value.toLowerCase();
  if (normalized.includes("opuedes") || normalized.includes("omper")) return samples[0].output;
  if (normalized.includes("ortografia") || normalized.includes("palabras claras")) return samples[1].output;
  if (normalized.includes("winget")) return samples[2].output;
  return value
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\bhola\b/i, "Hola")
    .replace(/\bmas\b/g, "más")
    .replace(/\bconfiguracion\b/g, "configuración")
    .replace(/\bortografia\b/g, "ortografía")
    .replace(/([^.!?])$/, "$1.");
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
    const x = ((event.clientX - rect.left) / rect.width - .5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - .5) * -8;
    card.style.transform = `rotateY(${x}deg) rotateX(${y}deg) translateY(-3px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

typeText(samples[0].output);
