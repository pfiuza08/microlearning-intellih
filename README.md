# 🧠 Agente de Microlearning Inteligente — Intellih

Projeto em desenvolvimento pela **Intellih Tecnologia Ltda.** inspirado no método **Learning How to Learn**, da professora **Barbara Oakley**, para criar uma experiência de **aprendizado ativo, adaptativo e orientado por IA**.

---

## 🎯 Objetivo

Oferecer uma ferramenta de **microlearning personalizada**, onde o usuário pode:

1. **Escolher um tema** de interesse **ou enviar seu próprio material** (PDF, DOCX, TXT);
2. Receber **microlições curtas e práticas** com base nesse conteúdo;
3. Realizar **simulados adaptativos** em formatos como ENEM, ENAMED, OAB, CESPE etc.;
4. Obter **feedback imediato** e recomendações personalizadas de estudo;
5. Evoluir diariamente segundo os princípios de foco, chunking e prática espaçada da Barbara Oakley.

---

## ⚙️ Estrutura do Projeto

microlearning-intellih/
├── public/ # imagens, ícones e manifest
├── src/
│ ├── assets/ # recursos visuais e de marca
│ ├── components/ # blocos reutilizáveis (ChatUI, QuizBlock, etc.)
│ ├── data/ # dicas, padrões e prompts base
│ ├── pages/ # páginas HTML (index principal)
│ ├── scripts/ # lógica principal do app
│ └── styles/ # CSS / Tailwind
├── api/ # rotas serverless (Vercel)
├── docs/ # documentação e roadmap
├── vercel.json
├── package.json
└── README.md


---

## 💻 Funcionalidades Principais (MVP)

✅ Escolha de tema ou upload de material (.txt, .pdf, .docx)  
✅ Geração automática de plano de microlearning (5, 7 ou 10 dias)  
✅ Lições curtas com explicações e questões de fixação  
✅ Simulados inteligentes (ENEM, ENAMED, OAB, CESPE, Geral)  
✅ Correção automática e registro de desempenho local  
✅ Exportar/importar plano em `.json`  
✅ Persistência via `localStorage`  
✅ Layout minimalista com **Tailwind CSS** nas cores da **Intellih**

---

## 🚀 Futuras Expansões

| Fase | Objetivo | Tecnologias |
|------|-----------|--------------|
| **1** | Conectar API GPT (geração real de lições e questões) | OpenAI API / LangChain |
| **2** | Parsing robusto de PDF/DOCX com OCR | pdf.js, docx-parser |
| **3** | Persistência em nuvem | Firebase / Supabase |
| **4** | Envio automático de lições | n8n / WhatsApp / e-mail |
| **5** | Gamificação e perfil de aprendizado | Sistema de pontos e badges |
| **6** | Portal multiusuário (dashboard) | Next.js / React / Auth |

---

## 🧩 Tecnologias Utilizadas

- **HTML5 / Tailwind CSS**
- **JavaScript Vanilla (ES6)**
- **LocalStorage** para persistência local
- **Vercel** para hospedagem e rotas serverless
- *(Opcional)* **LangChain + OpenAI API** para geração de conteúdo dinâmico

---

## 🔧 Instalação e Execução Local

```bash
# 1. Clone o repositório
git clone https://github.com/seuusuario/microlearning-intellih.git

# 2. Acesse o diretório
cd microlearning-intellih

# 3. (Opcional) Instale dependências, se usar Node
npm install

# 4. Rode localmente
vercel dev
📚 Fundamento Teórico

O projeto segue os princípios do método Learning How to Learn (Barbara Oakley):

Chunking: dividir o aprendizado em unidades curtas e significativas.

Focused vs. Diffuse Thinking: alternar entre foco e relaxamento para consolidar memórias.

Spaced Repetition: revisar com espaçamento temporal.

Active Recall: recuperar o conhecimento por meio de testes curtos.

Interleaving: misturar assuntos para melhor retenção.

🧠 Licença e Uso

© 2025 Intellih Tecnologia Ltda.

Todos os direitos reservados.

Uso permitido apenas para fins educacionais e demonstrações internas.
Para fins comerciais, entre em contato: contato@intellih.com.br

🌟 Créditos

Desenvolvido por Patrícia Fiuza de Castro
PhD em Engenharia de Sistemas e Computação — COPPE/UFRJ
Fundadora da Intellih Tecnologia Ltda.
Com apoio de agentes inteligentes da PromptBox IA
