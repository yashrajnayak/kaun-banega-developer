# Kaun Banega Developer

<div align="center">
  <img src="public/logo.png" alt="Game Logo" width="150" />
  <h3>A Developer-focused Game Show Experience</h3>
</div>

## Overview

Kaun Banega Developer (Who Wants to Be a Developer) is an interactive quiz game inspired by the classic TV show format, but focused on Git, GitHub, and GitHub Copilot knowledge.

## Features

- 15 progressively difficult questions about Git, GitHub, and GitHub Copilot
- Win up to 10,000 stickers (virtual, for fun only)
- Four powerful lifelines to help when you're stuck
- Safe levels to secure your winnings
- GitHub account integration
- Share your score with the community
- Sound effects and background music
- Offline play capability
- Mobile responsive design

## Play Online

The game is available at: [https://github.com/yashrajnayak/kaun-banega-developer](https://github.com/yashrajnayak/kaun-banega-developer)

## Technology Stack

- React
- TypeScript
- Tailwind CSS
- ShadcnUI Components
- Service workers for offline functionality

## Local Development

### Prerequisites

- Node.js 16+ and npm/yarn

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yashrajnayak/kaun-banega-developer.git
   cd kaun-banega-developer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Customizing Audio Files

The game uses various sound effects to enhance the experience. You can customize these by replacing the audio files in the `public/audio` folder:

| File | Description |
|------|-------------|
| `background.mp3` | Background music during gameplay |
| `correct.mp3` | Played when answering correctly |
| `wrong.mp3` | Played when answering incorrectly |
| `final-answer.mp3` | Played when selecting an answer |
| `lifeline.mp3` | Played when using a lifeline |
| `timer.mp3` | Ticking sound for countdowns |
| `game-over.mp3` | Played when the game ends with a loss |
| `applause.mp3` | Played when winning or walking away |

### Audio Format Requirements

- Use MP3 format for best browser compatibility
- Keep file sizes small (under 500KB) for faster loading
- Recommended audio settings: 128kbps, 44.1kHz, mono/stereo

### Disabling Audio

Users can disable game audio by toggling the sound button in the game interface, or you can set `audioEnabled` to `false` in localStorage.

## Audio Files Setup

The game requires audio files to be placed in the `public/audio` directory:

```
public/audio/
  ├── background.mp3    # Background music during gameplay
  ├── correct.mp3       # Sound when answering correctly
  ├── wrong.mp3        # Sound when answering incorrectly
  ├── final-answer.mp3  # Sound when locking in an answer
  ├── lifeline.mp3     # Sound when using a lifeline
  ├── timer.mp3        # Ticking sound for countdowns
  ├── game-over.mp3    # Sound when game ends with a loss
  └── applause.mp3     # Sound when winning or walking away
```

For optimal performance:
- Use MP3 format for best browser compatibility
- Keep file sizes small (under 500KB) for faster loading
- Recommended audio settings: 128kbps, 44.1kHz, mono/stereo

Audio files are not included in the repository to avoid copyright issues. You can:
1. Use your own audio files with the same names
2. Download free sound effects from sites like FreeSound.org
3. Disable audio by setting `audioEnabled` to `false` in localStorage

## Sharing Your Score

When you play the game with your GitHub username, you'll have the option to share your score! This creates a new issue in the scores repository with details about:

- Your GitHub username
- Your final score
- The questions you answered correctly
- Any questions you missed

It's a great way to challenge your friends and show off your GitHub knowledge!

## Customizing Questions

To add or modify questions, edit the `src/data/questions.ts` file:

```typescript
// Example question format
{
  id: 1,
  level: 'easy',  // 'easy', 'medium', or 'hard'
  text: 'What is Git?',
  options: [
    'A programming language',
    'A version control system',
    'A text editor',
    'A cloud hosting service'
  ],
  correctAnswer: 1,  // Index of the correct answer (0-based)
  documentation: 'Git is a distributed version control system...',
  debugCode: 'git --version',
  pollPercentages: [5, 85, 6, 4]  // Poll results for each option
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Disclaimer

This is a fun community project not affiliated with GitHub. All prizes shown are for representation purposes only; no real prizes are involved.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the TV show "Kaun Banega Crorepati" / "Who Wants to Be a Millionaire"
- Built with [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), and [ShadcnUI](https://ui.shadcn.com/)

## Support

For bug reports or feature requests, please [open an issue](https://github.com/yashrajnayak/kaun-banega-developer/issues/new).
