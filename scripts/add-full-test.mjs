/**
 * Ghép 2 passage sẵn có + 1 passage mới thành đề Reading Full Test 3 part,
 * đánh lại id câu hỏi liên tục (q1–q38), rồi thêm vào prisma/seed-data.json.
 * Chạy một lần: node scripts/add-full-test.mjs
 */
import fs from "node:fs";

const SEED_PATH = "prisma/seed-data.json";
const FULL_TEST_TITLE = "Reading Full Test 01 — 3 Passages";

const part3 = {
  passage: {
    title: "The Art of Forgetting",
    paragraphs: [
      "We tend to treat forgetting as a defect — a crack in the machinery of the mind through which precious information leaks away. Students curse it before examinations, and older adults fear it as a signal of decline. Yet a growing number of neuroscientists argue that forgetting is not a failure of memory but one of its most essential functions: a deliberate process that keeps the mind flexible, efficient and sane.",
      "The scientific study of forgetting began in 1885, when the German psychologist Hermann Ebbinghaus memorised thousands of invented syllables — meaningless combinations such as 'wid' and 'zof' — and then tested himself at intervals. He discovered that forgetting is dramatic at first and then slows: more than half of the material vanished within the first hour, while whatever survived a few days tended to persist for weeks. When he plotted his results, the line they formed became one of psychology's most famous images: the forgetting curve.",
      "Later researchers drew an important distinction between information that is truly lost and information that is merely unreachable. In the well-known 'tip-of-the-tongue' state, people can often recall the first letter of a word, or how many syllables it has, without being able to produce the word itself — persuasive evidence that the memory is still stored, and that what has broken down is retrieval. Much of everyday forgetting, in other words, is a filing problem rather than an erasure.",
      "More surprising is the discovery that the brain also erases actively. Far from being a passive fading, forgetting appears to be carried out by dedicated biological machinery. In a series of experiments with mice, researchers found that the birth of new neurons in the hippocampus — a region central to memory — actually weakened the animals' existing memories, as fresh connections overwrote old ones. The brain, it seems, spends energy not only recording the past but also clearing it away.",
      "Why would evolution build a machine that deletes its own data? The answer lies in what memory is for. Remembering every detail of every experience would bury the patterns that matter. By discarding particulars, the brain forms generalizations — rules that can be applied to situations it has never met. The cost of failing to forget is illustrated by the Russian journalist Solomon Shereshevsky, studied for decades in the twentieth century, who remembered virtually everything he encountered: strings of numbers, entire speeches, conversations from years before. Yet he struggled to grasp the general meaning of what he read, drowning in detail that others would have thankfully lost.",
      "Forgetting can even be steered. In 'directed forgetting' experiments, participants told to forget a list of words genuinely remember fewer of them later than participants told to keep them in mind. But not all memories obey. Those with strong emotional content — an accident, a humiliation, a moment of danger — are stubbornly resistant to erasure. This resistance is precisely what troubles people with post-traumatic stress disorder, and it explains why researchers hope that understanding the brain's natural forgetting machinery might one day help those who cannot stop remembering.",
      "None of this means that forgetting never fails us. But the next time a name slips away, it may be some comfort to recall that the same pruning which lost the name is what keeps the mind quick, general and clear — that we forget, in large part, so that we can think.",
    ],
  },
  questionGroups: [
    {
      type: "TFNG",
      instruction:
        "Do the following statements agree with the information given in the passage? Choose TRUE, FALSE or NOT GIVEN.",
      questions: [
        {
          id: "q26",
          prompt: "Hermann Ebbinghaus tested his memory using invented syllables.",
          options: ["TRUE", "FALSE", "NOT GIVEN"],
          answer: "TRUE",
        },
        {
          id: "q27",
          prompt: "Ebbinghaus found that most forgetting takes place slowly, over many years.",
          options: ["TRUE", "FALSE", "NOT GIVEN"],
          answer: "FALSE",
        },
        {
          id: "q28",
          prompt: "The 'tip-of-the-tongue' state suggests that some unrecalled information is still stored in memory.",
          options: ["TRUE", "FALSE", "NOT GIVEN"],
          answer: "TRUE",
        },
        {
          id: "q29",
          prompt: "Research on active forgetting has been carried out only on human participants.",
          options: ["TRUE", "FALSE", "NOT GIVEN"],
          answer: "FALSE",
        },
        {
          id: "q30",
          prompt: "Solomon Shereshevsky earned money by giving public memory performances.",
          options: ["TRUE", "FALSE", "NOT GIVEN"],
          answer: "NOT GIVEN",
        },
      ],
    },
    {
      type: "MC",
      instruction: "Choose the correct letter, A, B, C or D.",
      questions: [
        {
          id: "q31",
          prompt: "What is the main purpose of the first paragraph?",
          options: [
            "A. To describe how students prepare for examinations",
            "B. To challenge the common view of forgetting as a defect",
            "C. To explain the causes of memory decline in old age",
            "D. To compare human memory with a machine",
          ],
          answer: "B",
        },
        {
          id: "q32",
          prompt: "What did the experiments with mice demonstrate?",
          options: [
            "A. Mice have weaker memories than other animals",
            "B. The hippocampus plays no role in forgetting",
            "C. The growth of new neurons can weaken existing memories",
            "D. Old memories prevent new neurons from forming",
          ],
          answer: "C",
        },
        {
          id: "q33",
          prompt: "According to the passage, Shereshevsky's exceptional memory caused him to",
          options: [
            "A. forget emotionally important events.",
            "B. find it hard to understand the overall meaning of texts.",
            "C. lose interest in reading altogether.",
            "D. remember only strings of numbers.",
          ],
          answer: "B",
        },
        {
          id: "q34",
          prompt: "The writer mentions post-traumatic stress disorder in order to",
          options: [
            "A. show that directed forgetting works for every kind of memory.",
            "B. argue that emotional memories fade faster than neutral ones.",
            "C. illustrate the problems caused when memories resist erasure.",
            "D. prove that forgetting cannot be studied scientifically.",
          ],
          answer: "C",
        },
      ],
    },
    {
      type: "GAP",
      instruction:
        "Complete the sentences below. Write NO MORE THAN TWO WORDS from the passage for each answer.",
      questions: [
        {
          id: "q35",
          prompt: "When Ebbinghaus plotted his results, the line became known as the forgetting ______.",
          answer: "curve",
        },
        {
          id: "q36",
          prompt: "When stored information cannot be accessed, the problem lies with ______ rather than storage.",
          answer: "retrieval",
        },
        {
          id: "q37",
          prompt: "By discarding details, the brain is able to form ______ that can be applied to new situations.",
          answer: "generalizations",
          altAnswers: ["generalisations", "rules"],
        },
        {
          id: "q38",
          prompt: "Memories with strong ______ content are especially difficult to erase.",
          answer: "emotional",
        },
      ],
    },
  ],
};

/** Đánh lại id câu hỏi của một part theo số bắt đầu cho trước. */
function remapIds(part, startNo) {
  let n = startNo - 1;
  return {
    passage: part.passage,
    questionGroups: part.questionGroups.map((g) => ({
      ...g,
      questions: g.questions.map((q) => {
        n += 1;
        return { ...q, id: `q${n}` };
      }),
    })),
  };
}

const seed = JSON.parse(fs.readFileSync(SEED_PATH, "utf8"));

if (seed.exercises.some((e) => e.title === FULL_TEST_TITLE)) {
  console.log("Đề full test đã tồn tại trong seed — bỏ qua.");
  process.exit(0);
}

const bridges = seed.exercises.find((e) => e.title.includes("The Story of Bridges"));
const bilingual = seed.exercises.find((e) => e.title.includes("The Bilingual Brain"));
if (!bridges || !bilingual) {
  console.error("Không tìm thấy 2 passage nguồn trong seed-data.json");
  process.exit(1);
}

const part1 = remapIds(structuredClone(bridges.content), 1); // q1–q13
const part2 = remapIds(structuredClone(bilingual.content), 14); // q14–q25
// part3 đã đánh id q26–q38 sẵn

seed.exercises.push({
  skill: "READING",
  taskType: "READING_FULL",
  title: FULL_TEST_TITLE,
  description:
    "Đề thi thử hoàn chỉnh: 3 passages · 38 câu hỏi · 60 phút · giao diện mô phỏng thi máy (chuyển part, đánh dấu câu, highlight).",
  durationMinutes: 60,
  content: { parts: [part1, part2, part3] },
});

fs.writeFileSync(SEED_PATH, JSON.stringify(seed, null, 2));
const total = [part1, part2, part3].reduce(
  (s, p) => s + p.questionGroups.reduce((x, g) => x + g.questions.length, 0),
  0
);
console.log(`✓ Đã thêm "${FULL_TEST_TITLE}" (${total} câu, 3 part) vào seed-data.json`);
