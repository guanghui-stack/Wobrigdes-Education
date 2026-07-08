/**
 * Tạo đề demo chứa ĐỦ 8 dạng câu hỏi Reading (dùng passage The Story of Bridges
 * có sẵn trong seed) — để admin và học viên trải nghiệm mọi dạng bài.
 * Chạy một lần: node scripts/add-types-demo.mjs
 */
import fs from "node:fs";

const SEED_PATH = "prisma/seed-data.json";
const DEMO_TITLE = "Reading Demo — All Question Types (8 dạng câu hỏi)";

const seed = JSON.parse(fs.readFileSync(SEED_PATH, "utf8"));

if (seed.exercises.some((e) => e.title === DEMO_TITLE)) {
  console.log("Đề demo đã tồn tại — bỏ qua.");
  process.exit(0);
}

const bridges = seed.exercises.find((e) =>
  e.title.includes("The Story of Bridges")
);
if (!bridges) {
  console.error("Không tìm thấy passage nguồn.");
  process.exit(1);
}
const paragraphs = bridges.content.passage.paragraphs; // 6 đoạn A–F

const content = {
  parts: [
    {
      passage: {
        title: "The Story of Bridges",
        paragraphs,
        labelParagraphs: true,
      },
      questionGroups: [
        // ===== 1. MATCHING HEADINGS (q1–q3) =====
        {
          type: "MATCH_HEADINGS",
          instruction:
            "The passage has six paragraphs, A–F. Choose the correct heading for paragraphs B, C and D from the list of headings below. Drag the heading to the correct box in the passage.",
          options: [
            "Ancient engineering that still stands",
            "New materials transform bridge design",
            "Triumph and disaster in the modern era",
            "The rising cost of bridge construction",
            "Bridges in myths and legends",
          ],
          questions: [
            { id: "q1", paragraph: "B", answer: "i" },
            { id: "q2", paragraph: "C", answer: "ii" },
            { id: "q3", paragraph: "D", answer: "iii" },
          ],
        },
        // ===== 2. TRUE / FALSE / NOT GIVEN (q4–q5) =====
        {
          type: "TFNG",
          instruction:
            "Do the following statements agree with the information given in the passage? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, or NOT GIVEN if there is no information on this.",
          questions: [
            {
              id: "q4",
              prompt: "The Alcántara Bridge still carries traffic today.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              answer: "TRUE",
            },
            {
              id: "q5",
              prompt: "The first major iron bridge was built in the seventeenth century.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              answer: "FALSE",
            },
          ],
        },
        // ===== 3. MULTIPLE CHOICE 1 đáp án (q6) =====
        {
          type: "MC",
          instruction: "Choose the correct letter, A, B, C or D.",
          questions: [
            {
              id: "q6",
              prompt: "What is the main purpose of the final paragraph?",
              options: [
                "A. To describe the cost of modern bridges",
                "B. To compare bridges in different countries",
                "C. To explain the symbolic meaning bridges hold for people",
                "D. To predict future bridge technology",
              ],
              answer: "C",
            },
          ],
        },
        // ===== 4. MATCHING INFORMATION (q7–q9) =====
        {
          type: "MATCH_INFO",
          instruction:
            "Which paragraph contains the following information? Choose the correct letter, A–F.",
          options: ["A", "B", "C", "D", "E", "F"],
          reuseOptions: true,
          questions: [
            {
              id: "q7",
              prompt: "a description of a bridge that destroyed itself in moderate winds",
              answer: "D",
            },
            {
              id: "q8",
              prompt: "a reference to the longest bridge in the world",
              answer: "E",
            },
            {
              id: "q9",
              prompt: "the reason the earliest bridges were built",
              answer: "A",
            },
          ],
        },
        // ===== 5. MATCHING FEATURES (q10–q12) =====
        {
          type: "MATCH_FEATURES",
          instruction:
            "Look at the following statements and the list of bridges below. Match each statement with the correct bridge, A–D.",
          options: [
            "The Alcántara Bridge",
            "The Coalbrookdale bridge",
            "The Golden Gate Bridge",
            "The Danyang–Kunshan Grand Bridge",
          ],
          reuseOptions: true,
          questions: [
            { id: "q10", prompt: "It opened to the public in 1937.", answer: "C" },
            { id: "q11", prompt: "It was the world's first major iron bridge.", answer: "B" },
            { id: "q12", prompt: "It stretches for 165 kilometres.", answer: "D" },
          ],
        },
        // ===== 6. MULTIPLE CHOICE nhiều đáp án (q13–q14) =====
        {
          type: "MC_MULTI",
          instruction: "Choose TWO correct answers.",
          questions: [
            {
              id: "q13",
              prompt:
                "Which TWO materials does the writer mention as being used for bridges before the industrial era?",
              options: [
                "A. Timber",
                "B. Glass",
                "C. Stone",
                "D. Plastic",
                "E. Aluminium",
              ],
              selectCount: 2,
              answer: ["A", "C"],
            },
          ],
        },
        // ===== 7. GAP FILLING trong khung tóm tắt (q15–q16) =====
        {
          type: "GAP",
          instruction: "Complete the summary below.",
          wordLimit: "TWO_WORDS_NUMBER",
          boxTitle: "Bridges in numbers",
          questions: [
            {
              id: "q15",
              prompt: "The main span of the Golden Gate Bridge measures ______ metres.",
              answer: "1,280",
              altAnswers: ["1280"],
            },
            {
              id: "q16",
              prompt: "Roman engineers invented a form of concrete that could harden ______.",
              answer: "underwater",
              altAnswers: ["under water"],
            },
          ],
        },
        // ===== 8. MATCHING SENTENCE ENDINGS (q17–q18) =====
        {
          type: "MATCH_ENDINGS",
          instruction: "Complete each sentence with the correct ending, A–C, below.",
          options: [
            "to link farmland with markets.",
            "to test designs against wind and resonance.",
            "to build entirely with gold.",
          ],
          questions: [
            {
              id: "q17",
              prompt: "The earliest bridges allowed communities",
              answer: "A",
            },
            {
              id: "q18",
              prompt: "After the Tacoma Narrows collapse, engineers understood the need",
              answer: "B",
            },
          ],
        },
      ],
    },
  ],
};

seed.exercises.push({
  skill: "READING",
  taskType: "READING_PASSAGE",
  title: DEMO_TITLE,
  description:
    "Đề trải nghiệm đủ 8 dạng câu hỏi: Matching Headings (kéo-thả vào bài đọc), TFNG, Multiple Choice 1 & nhiều đáp án, Matching Information/Features (kéo-thả, dùng lại đáp án), Gap Filling (giới hạn từ), Matching Endings · 18 câu · 25 phút.",
  durationMinutes: 25,
  content,
});

fs.writeFileSync(SEED_PATH, JSON.stringify(seed, null, 2));
console.log(`✓ Đã thêm "${DEMO_TITLE}" (18 câu, 8 dạng) vào seed-data.json`);
