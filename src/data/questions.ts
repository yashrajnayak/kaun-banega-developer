export interface Question {
  id: number;
  level: 'easy' | 'medium' | 'hard';
  text: string;
  options: string[];
  correctAnswer: number;
  documentation?: string;
  debugCode?: string;
  pollPercentages?: number[];
}

export interface PrizeLevel {
  questionNumber: number;
  amount: number;
  isSafe: boolean;
}

// Prize levels - increasing GitHub sticker amounts
export const prizeLevels: PrizeLevel[] = [
  { questionNumber: 1, amount: 10, isSafe: false },
  { questionNumber: 2, amount: 20, isSafe: false },
  { questionNumber: 3, amount: 50, isSafe: false },
  { questionNumber: 4, amount: 100, isSafe: false },
  { questionNumber: 5, amount: 200, isSafe: true },  // Safe level
  { questionNumber: 6, amount: 300, isSafe: false },
  { questionNumber: 7, amount: 500, isSafe: false },
  { questionNumber: 8, amount: 750, isSafe: false },
  { questionNumber: 9, amount: 1000, isSafe: false },
  { questionNumber: 10, amount: 2000, isSafe: true }, // Safe level
  { questionNumber: 11, amount: 3000, isSafe: false },
  { questionNumber: 12, amount: 4000, isSafe: false },
  { questionNumber: 13, amount: 5000, isSafe: false },
  { questionNumber: 14, amount: 7500, isSafe: false },
  { questionNumber: 15, amount: 10000, isSafe: false }
];

// Game questions - focused on Git, GitHub, and GitHub Copilot
export const questions: Question[] = [
  // Easy Questions (1-15)
  {
    id: 1,
    level: 'easy',
    text: 'What is Git?',
    options: [
      'A programming language',
      'A version control system',
      'A text editor',
      'A cloud hosting service'
    ],
    correctAnswer: 1,
    documentation: 'Git is a distributed version control system that tracks changes in source code during software development.',
    debugCode: 'git --version',
    pollPercentages: [5, 85, 6, 4]
  },
  {
    id: 2,
    level: 'easy',
    text: 'What is a repository in Git?',
    options: [
      'A database of all commit history',
      'A folder containing project files tracked by Git',
      'A backup server',
      'A collaboration platform'
    ],
    correctAnswer: 1,
    documentation: 'A Git repository is a directory that contains all of your project files and the entire revision history.',
    debugCode: 'git init\n# Creates a new Git repository',
    pollPercentages: [12, 78, 5, 5]
  },
  {
    id: 3,
    level: 'easy',
    text: 'What is GitHub?',
    options: [
      'A programming language',
      'A code editor with Git integration',
      'A web-based hosting service for Git repositories',
      'A local Git client'
    ],
    correctAnswer: 2,
    documentation: 'GitHub is a web-based hosting service for version control using Git. It offers all the distributed version control and source code management functionality of Git plus its own features.',
    debugCode: 'git remote add origin https://github.com/username/repository.git',
    pollPercentages: [2, 8, 86, 4]
  },
  {
    id: 4,
    level: 'easy',
    text: 'What command is used to create a new Git repository?',
    options: [
      'git start',
      'git create',
      'git new',
      'git init'
    ],
    correctAnswer: 3,
    documentation: 'The git init command creates a new Git repository. It can be used to convert an existing, unversioned project to a Git repository or initialize a new, empty repository.',
    debugCode: 'mkdir new-project\ncd new-project\ngit init',
    pollPercentages: [7, 5, 8, 80]
  },
  {
    id: 5,
    level: 'easy',
    text: 'What is GitHub Copilot?',
    options: [
      'A flight simulator game',
      'An AI pair programmer that suggests code',
      'A GitHub project manager',
      'A debugging tool'
    ],
    correctAnswer: 1,
    documentation: 'GitHub Copilot is an AI pair programmer that offers autocomplete-style suggestions as you code. It\'s powered by OpenAI Codex and trained on billions of lines of public code.',
    debugCode: '// GitHub Copilot can suggest entire functions\n// Just start typing and it will provide suggestions',
    pollPercentages: [3, 84, 8, 5]
  },
  {
    id: 6,
    level: 'easy',
    text: 'What is a Git branch?',
    options: [
      'A backup of your code',
      'A separate line of development',
      'A type of Git error',
      'A remote repository'
    ],
    correctAnswer: 1,
    documentation: 'A branch in Git is a lightweight movable pointer to a commit. It represents an independent line of development.',
    debugCode: 'git branch\n# List all branches\ngit branch new-feature\n# Create a new branch',
    pollPercentages: [10, 75, 5, 10]
  },
  {
    id: 7,
    level: 'easy',
    text: 'Which command switches between Git branches?',
    options: [
      'git switch',
      'git branch',
      'git checkout',
      'Both A and C'
    ],
    correctAnswer: 3,
    documentation: 'Both git checkout and git switch (introduced in Git 2.23) can be used to switch between branches.',
    debugCode: 'git checkout main\n# or\ngit switch main',
    pollPercentages: [15, 5, 20, 60]
  },
  {
    id: 8,
    level: 'easy',
    text: 'What is a .gitignore file?',
    options: [
      'A file containing Git commands',
      'A file listing items Git should not track',
      'A Git configuration file',
      'A backup file'
    ],
    correctAnswer: 1,
    documentation: 'The .gitignore file tells Git which files or directories to ignore in a project.',
    debugCode: '# Example .gitignore\nnode_modules/\n*.log\n.env',
    pollPercentages: [5, 82, 8, 5]
  },
  {
    id: 9,
    level: 'easy',
    text: 'What is GitHub Codespaces?',
    options: [
      'A code editor',
      'A cloud-based development environment',
      'A GitHub desktop app',
      'A code formatting tool'
    ],
    correctAnswer: 1,
    documentation: 'GitHub Codespaces provides cloud-based development environments that are customizable and accessible from anywhere.',
    debugCode: '# Launch from GitHub repository:\n# Click Code > Codespaces > New codespace',
    pollPercentages: [5, 80, 10, 5]
  },
  {
    id: 10,
    level: 'easy',
    text: 'What is a GitHub Action?',
    options: [
      'A type of pull request',
      'An automated workflow',
      'A GitHub notification',
      'A repository setting'
    ],
    correctAnswer: 1,
    documentation: 'GitHub Actions automate software workflows, allowing you to build, test, and deploy code directly from GitHub.',
    debugCode: '# Example workflow yaml\nname: CI\non: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest',
    pollPercentages: [5, 85, 5, 5]
  },
  // Medium Questions (16-30)
  {
    id: 11,
    level: 'medium',
    text: 'How do you stage changes for commit in Git?',
    options: [
      'git stage',
      'git commit',
      'git add',
      'git push'
    ],
    correctAnswer: 2,
    documentation: 'The git add command adds a change in the working directory to the staging area. It tells Git that you want to include updates to a particular file in the next commit.',
    debugCode: 'git add filename.txt\n# or stage all changes\ngit add .',
    pollPercentages: [10, 5, 80, 5]
  },
  {
    id: 12,
    level: 'medium',
    text: 'What is a pull request in GitHub?',
    options: [
      'A request to pull code from the server',
      'A request to merge changes from one branch to another',
      'A method to download code updates',
      'A type of Git repository'
    ],
    correctAnswer: 1,
    documentation: 'Pull requests let you tell others about changes you\'ve pushed to a branch in a repository on GitHub. Once a pull request is opened, you can discuss and review the potential changes with collaborators before your changes are merged into the base branch.',
    debugCode: '# Create a new branch for your feature\ngit checkout -b feature-branch\n# Make changes and push\ngit push origin feature-branch\n# Then create PR on GitHub',
    pollPercentages: [5, 78, 10, 7]
  },
  {
    id: 13,
    level: 'medium',
    text: 'Which command shows the status of files in a Git repository?',
    options: [
      'git check',
      'git status',
      'git files',
      'git info'
    ],
    correctAnswer: 1,
    documentation: 'The git status command displays the state of the working directory and the staging area. It lets you see which changes have been staged, which haven\'t, and which files aren\'t being tracked by Git.',
    debugCode: 'git status\n# Shows modified files, staged changes, and branch information',
    pollPercentages: [5, 85, 7, 3]
  },
  {
    id: 14,
    level: 'medium',
    text: 'What does the git clone command do?',
    options: [
      'Creates a duplicate of a local repository',
      'Creates a copy of a remote repository on your local machine',
      'Creates a new branch in the repository',
      'Creates a backup of the repository'
    ],
    correctAnswer: 1,
    documentation: 'The git clone command creates a copy of an existing Git repository. It\'s commonly used to download a project from a remote repository, like one on GitHub.',
    debugCode: 'git clone https://github.com/username/repository.git',
    pollPercentages: [8, 82, 6, 4]
  },
  {
    id: 15,
    level: 'medium',
    text: 'Which GitHub feature allows you to save code for later reference without creating a full repository?',
    options: [
      'GitHub Stars',
      'GitHub Bookmarks',
      'GitHub Gists',
      'GitHub Notes'
    ],
    correctAnswer: 2,
    documentation: 'GitHub Gists are a simple way to share code snippets and useful fragments with others. Every gist is a Git repository, which means it can be forked and cloned.',
    debugCode: '# Gists can be created on GitHub.com\n# They can be public or secret\n# Example URL: https://gist.github.com/username/gist-id',
    pollPercentages: [15, 5, 75, 5]
  },
  {
    id: 16,
    level: 'medium',
    text: 'What is Git stash?',
    options: [
      'A backup repository',
      'A temporary storage for changes',
      'A Git error log',
      'A remote branch'
    ],
    correctAnswer: 1,
    documentation: 'Git stash temporarily shelves changes you\'ve made to your working copy so you can work on something else.',
    debugCode: 'git stash save "work in progress"\ngit stash list\ngit stash pop',
    pollPercentages: [5, 80, 5, 10]
  },
  {
    id: 17,
    level: 'medium',
    text: 'What is a GitHub webhook?',
    options: [
      'A type of GitHub profile',
      'A notification system',
      'An automated HTTP callback',
      'A repository backup'
    ],
    correctAnswer: 2,
    documentation: 'Webhooks allow external services to be notified when certain events happen on GitHub.',
    debugCode: '# Webhook payload example\n{\n  "event": "push",\n  "repository": "user/repo",\n  "commits": [...]\n}',
    pollPercentages: [5, 10, 80, 5]
  },
  {
    id: 18,
    level: 'medium',
    text: 'What is GitHub Advanced Security?',
    options: [
      'Two-factor authentication',
      'A premium GitHub subscription',
      'A security scanning tool suite',
      'A firewall service'
    ],
    correctAnswer: 2,
    documentation: 'GitHub Advanced Security provides security features like code scanning, secret scanning, and dependency review.',
    debugCode: '# Example CodeQL workflow\nname: "CodeQL"\non: [push]\njobs:\n  analyze:\n    runs-on: ubuntu-latest',
    pollPercentages: [10, 5, 80, 5]
  },
  {
    id: 19,
    level: 'medium',
    text: 'What is a Git submodule?',
    options: [
      'A Git extension',
      'A repository inside another repository',
      'A branch type',
      'A merge strategy'
    ],
    correctAnswer: 1,
    documentation: 'Git submodules allow you to keep a Git repository as a subdirectory of another Git repository.',
    debugCode: 'git submodule add https://github.com/user/repo\ngit submodule update --init --recursive',
    pollPercentages: [5, 75, 15, 5]
  },
  {
    id: 20,
    level: 'medium',
    text: 'What is GitHub Packages?',
    options: [
      'A package compression tool',
      'A package hosting service',
      'A dependency manager',
      'A code bundler'
    ],
    correctAnswer: 1,
    documentation: 'GitHub Packages is a package hosting service that allows you to host your packages privately or publicly.',
    debugCode: '# Example package.json\n{\n  "publishConfig": {\n    "registry": "https://npm.pkg.github.com"\n  }\n}',
    pollPercentages: [5, 80, 10, 5]
  },
  // Hard Questions (31-45)
  {
    id: 21,
    level: 'hard',
    text: 'How do you resolve a merge conflict in Git?',
    options: [
      'Use git resolve command',
      'Delete the conflicting branch',
      'Manually edit the files with conflicts, then add and commit them',
      'Use git ignore-conflict command'
    ],
    correctAnswer: 2,
    documentation: 'Resolving a merge conflict in Git requires manually editing the files to reconcile the conflicting changes. After fixing the conflicts, you need to add the resolved files and complete the merge with a commit.',
    debugCode: '# When a conflict occurs during merge:\n# 1. Open the conflicted files\n# 2. Look for markers like <<<<<<< HEAD, =======, and >>>>>>>\n# 3. Edit the files to resolve conflicts\ngit add resolved-file.txt\ngit commit -m "Resolved merge conflict"',
    pollPercentages: [10, 5, 80, 5]
  },
  {
    id: 22,
    level: 'hard',
    text: 'What is a Git rebase?',
    options: [
      'A command to reset your repository to a previous state',
      'A way to integrate changes from one branch onto another by moving commits',
      'A tool to visualize the commit history',
      'A method to clean up unnecessary files'
    ],
    correctAnswer: 1,
    documentation: 'Git rebase is the process of moving or combining a sequence of commits to a new base commit. Rebasing is changing the base of your branch from one commit to another, making it appear as if you\'d created your branch from a different commit.',
    debugCode: '# Rebasing feature branch onto main\ngit checkout feature\ngit rebase main\n\n# Interactive rebase to modify history\ngit rebase -i HEAD~3  # Rebase last 3 commits',
    pollPercentages: [8, 75, 12, 5]
  },
  {
    id: 23,
    level: 'hard',
    text: 'How does GitHub Copilot handle sensitive information in its suggestions?',
    options: [
      'It automatically encrypts all sensitive data',
      'It includes all data it finds for accuracy',
      'It attempts to filter out personal data and secrets',
      'It requires manual approval for each line of code'
    ],
    correctAnswer: 2,
    documentation: 'GitHub Copilot is designed to filter out potential secrets like API keys from its training data and suggestions. However, it\'s still important for developers to review suggestions and not rely on this filtering as a security measure.',
    debugCode: '// Copilot tries to avoid suggesting sensitive patterns like:\nconst apiKey = "ACTUAL_KEY_HERE" // Don\'t do this!\n\n// Better to use environment variables:\nconst apiKey = process.env.API_KEY',
    pollPercentages: [5, 5, 85, 5]
  },
  {
    id: 24,
    level: 'hard',
    text: 'Which command would you use to view the commit history of a Git repository?',
    options: [
      'git history',
      'git log',
      'git commits',
      'git show'
    ],
    correctAnswer: 1,
    documentation: 'The git log command shows the commit logs. It lists the commits made in that repository in reverse chronological order. There are many options to format the output in various ways.',
    debugCode: '# Basic log\ngit log\n\n# Compact log format\ngit log --oneline\n\n# Pretty graph\ngit log --graph --oneline --decorate',
    pollPercentages: [5, 82, 8, 5]
  },
  {
    id: 25,
    level: 'hard',
    text: 'What happens under the hood when GitHub Copilot generates code suggestions?',
    options: [
      'It searches Stack Overflow for similar code patterns',
      'It uses pre-written templates stored in a database',
      'It runs a large language model that predicts code based on context',
      'It combines code snippets from existing GitHub repositories'
    ],
    correctAnswer: 2,
    documentation: 'GitHub Copilot is powered by OpenAI Codex, a large language model trained on billions of lines of public code. It generates suggestions by predicting what code should come next, based on the context and comments provided.',
    debugCode: '// Example showing Copilot\'s understanding of context\n// Let\'s say you write a comment like:\n\n// Function to calculate factorial of a number\n// Copilot might suggest:\nfunction factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}',
    pollPercentages: [5, 5, 85, 5]
  },
  {
    id: 26,
    level: 'hard',
    text: 'What is Git bisect?',
    options: [
      'A branch splitting tool',
      'A bug finding command',
      'A code formatter',
      'A merge conflict resolver'
    ],
    correctAnswer: 1,
    documentation: 'Git bisect helps find the commit that introduced a bug using binary search.',
    debugCode: 'git bisect start\ngit bisect bad HEAD\ngit bisect good v1.0\n# Test and mark commits until found',
    pollPercentages: [5, 80, 10, 5]
  },
  {
    id: 27,
    level: 'hard',
    text: 'What is GitHub Dependabot?',
    options: [
      'A chat bot',
      'A code review bot',
      'A dependency update bot',
      'A deployment bot'
    ],
    correctAnswer: 2,
    documentation: 'Dependabot creates pull requests to keep your dependencies up to date.',
    debugCode: '# dependabot.yml\nversion: 2\nupdates:\n  - package-ecosystem: "npm"\n    directory: "/"\n    schedule:\n      interval: "daily"',
    pollPercentages: [5, 5, 85, 5]
  },
  {
    id: 28,
    level: 'hard',
    text: 'What is Git cherry-pick?',
    options: [
      'A branch cleanup tool',
      'A commit selection command',
      'A merge strategy',
      'A conflict resolver'
    ],
    correctAnswer: 1,
    documentation: 'Git cherry-pick applies the changes from specific commits to the current branch.',
    debugCode: 'git cherry-pick abc123\n# Apply commit abc123 to current branch',
    pollPercentages: [5, 80, 10, 5]
  },
  {
    id: 29,
    level: 'hard',
    text: 'What is GitHub Codespaces prebuilds?',
    options: [
      'Pre-compiled code',
      'Cached development containers',
      'Code templates',
      'Build artifacts'
    ],
    correctAnswer: 1,
    documentation: 'Codespaces prebuilds speed up creation by preparing development containers in advance.',
    debugCode: '# devcontainer.json\n{\n  "image": "mcr.microsoft.com/devcontainers/universal:2",\n  "features": {...}\n}',
    pollPercentages: [5, 80, 10, 5]
  },
  {
    id: 30,
    level: 'hard',
    text: 'What is Git reflog?',
    options: [
      'A commit log',
      'A reference history log',
      'An error log',
      'A merge log'
    ],
    correctAnswer: 1,
    documentation: 'Git reflog records when Git references were updated in the local repository.',
    debugCode: 'git reflog\n# Shows history of HEAD updates\ngit reflog show branch-name',
    pollPercentages: [10, 75, 10, 5]
  }
];
