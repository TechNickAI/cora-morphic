# Cora: Heart-Centered AI Assistant 🤖 + 💙

![Build Status](https://github.com/TechNickAI/cora-morphic/actions/workflows/build.yml/badge.svg)
![Lint Status](https://github.com/TechNickAI/cora-morphic/actions/workflows/linter.yml/badge.svg)

## Overview

Cora is a heart-centered AI assistant designed to revolutionize the way we interact with technology and enhance human potential. Named after the Latin word for "heart," Cora embodies our commitment to creating AI that is not just intelligent, but also empathetic, ethical, and aligned with human values.

Our vision is to develop an AI assistant that serves as a synergist between human creativity and technological capability. Cora is not just a tool, but a partner in your personal and professional growth, aimed at amplifying your effectiveness and helping you achieve a 100x improvement in various aspects of your life.

See [design.md](docs/design.md) for more details on the design and architecture.

## Ethos and Goals

At the core of Cora's development is the philosophy of Heart Centered AI, which seeks to create a harmonious intersection between humanity and technology. Our goals include:

1. Empowerment: Enhance human capabilities, allowing users to focus on high-level strategy and creativity.
2. Ethical AI: Ensure that AI development remains grounded in empathy and multi-variate values.
3. Personalization: Provide deeply tailored assistance by leveraging personal data responsibly.
4. Efficiency: Dramatically improve productivity by handling a wide range of tasks with varying complexity.
5. Innovation: Push the boundaries of what's possible with AI, particularly in entrepreneurial and creative domains.
6. Holistic Growth: Support users in achieving balance across all aspects of life, not just career or productivity.

## Installation and Setup

To get up and running in a development environment, follow these steps:

```bash
pnpm install
pnpm run dev
```

You'll have to set up a few environment variables to get the app running. See [.env.example](.env.example) for more details.

## TODOs

### First release (on par with typing mind)

- [x] Base nextjs setup
- [x] Basic chat working with an agent
- [x] Anthropic support
- [ ] Pre-process the users request
- [ ] Login with Google
- [ ] Store all chat histories in Zep or MemGPT
- [ ] Voice input
- [ ] Display status from tools
- [ ] Dynamically choose which is the best model for the query
- [ ] Link to appropriate google results
- [ ] Perplexity support
- [x] Card library for sophisticated responses (thank you @miurla for Morphic)
- [ ] Dynamically generate the cards (Generative UI) (thank you @miurla for Morphic)
- [ ] Use the memory to store facts and have them included in the response
- [ ] Allow for past user chat histories to be referenced in responses
- [ ] Greet the user with a personalized opening chat

### After first release

- [ ] New User onboarding (gather facts, walk them through the interface)
- [ ] Web page reader
- [ ] Cora as an orchestration layer
- [ ] Upload files
- [ ] Generate images
- [ ] Cora as a product manager for one user. Then sharing information across users to self improve.
- [ ] Dynamically create the agents to perform the task
- [ ] Support sophisticated multi agent report for detailed research

## Ideas to explore

## Agent

- Chain of Reasoning
- Multi agent (CrewAI, Autogen)
- [Meta Prompting](https://arxiv.black/pdf/2401.12954)

### Card Library ideas

- Google Maps
- Yelp
- Restaraunt view
- Wikipedia view

### Pre-processing ideas

- Detect if the user would be best served by Google's first result and do that
- Detect if the request is quick and simple, and respond with grok
- Empathize with the the user and have that inform the tone of the response
- Enhance the query (prompt engineering)
- Detect if the user will want up to date information (use perplexity)

## Coding Principles

Borrowed from the [zen of python](http://c2.com/cgi/wiki?PythonPhilosophy), with a couple of changes.

```text
1. **Readability is the number 1 code quality metric**.
2. Beautiful is better than ugly.
3. Explicit is better than implicit.
4. Simple is better than complex.
5. Complex is better than complicated.
6. Flat is better than nested.
7. Sparse is better than dense.
8. Special cases aren't special enough to break the rules.
    * Although practicality beats purity.
9. Errors should never pass silently.
    * Unless explicitly silenced.
10. In the face of ambiguity, refuse the temptation to guess.
11. There should be one -- and preferably only one -- obvious way to do it.
12. Now is better than never.
```
