'use client'
import { useState, useRef, useEffect } from 'react'

// ── Git simulation state ───────────────────────────────────────────
const INITIAL_STATE = {
  branch: 'main',
  branches: ['main'],
  stagedFiles: [],
  unstagedFiles: ['README.md', 'index.js', 'styles.css'],
  commits: [
    { hash: 'a1b2c3d', message: 'initial commit', branch: 'main' }
  ],
  stash: [],
  remoteExists: true,
  remoteBranches: ['main'],
  lastPushed: 'a1b2c3d',
}

// ── Lessons / challenges ───────────────────────────────────────────
const LESSONS = [
  {
    id: 1,
    title: 'Stage a file',
    desc: 'You have 3 unstaged files. Stage README.md using git add.',
    hint: 'Try: git add README.md',
    check: (state) => state.stagedFiles.includes('README.md'),
    successMsg: 'README.md is now staged and ready to commit.',
  },
  {
    id: 2,
    title: 'Stage all files',
    desc: 'Stage all remaining unstaged files at once.',
    hint: 'Try: git add .',
    check: (state) => state.unstagedFiles.length === 0 && state.stagedFiles.length > 0,
    successMsg: 'All files staged! You are ready to commit.',
  },
  {
    id: 3,
    title: 'Make a commit',
    desc: 'Commit your staged files with a meaningful message.',
    hint: 'Try: git commit -m "your message here"',
    check: (state, prev) => state.commits.length > prev.commits.length,
    successMsg: 'Commit created! Your changes are saved to local history.',
  },
  {
    id: 4,
    title: 'Create a branch',
    desc: 'Create a new branch called feature/navbar.',
    hint: 'Try: git branch feature/navbar',
    check: (state) => state.branches.includes('feature/navbar'),
    successMsg: 'Branch created! Branches let you work on features without affecting main.',
  },
  {
    id: 5,
    title: 'Switch branches',
    desc: 'Switch to the feature/navbar branch.',
    hint: 'Try: git checkout feature/navbar',
    check: (state) => state.branch === 'feature/navbar',
    successMsg: 'Switched to feature/navbar. You are now working on a separate branch.',
  },
  {
    id: 6,
    title: 'Push to remote',
    desc: 'Push your current branch to the remote repository.',
    hint: 'Try: git push origin main',
    check: (state) => state.remoteBranches.includes(state.branch),
    successMsg: 'Pushed to remote! Your changes are now on GitHub.',
  },
]

// ── Command parser & executor ──────────────────────────────────────
function executeCommand(input, state, setState, addOutput, currentLesson, prevState) {
  const parts = input.trim().split(/\s+/)
  if (parts[0] !== 'git' && parts[0] !== 'clear' && parts[0] !== 'help' && parts[0] !== 'lesson') {
    addOutput(`command not found: ${parts[0]}. Type 'help' for available commands.`, 'error')
    return state
  }

  if (parts[0] === 'clear') {
    return '__clear__'
  }

  if (parts[0] === 'help') {
    addOutput(`Available commands:
  git status          — show working tree status
  git add <file>      — stage a file (use . for all)
  git commit -m "msg" — commit staged files
  git log             — show commit history
  git branch          — list branches
  git branch <name>   — create a new branch
  git checkout <name> — switch to a branch
  git checkout -b <n> — create and switch to branch
  git push origin <b> — push branch to remote
  git pull            — pull latest from remote
  git stash           — stash current changes
  git stash pop       — apply stashed changes
  git diff            — show unstaged changes
  git reset HEAD <f>  — unstage a file
  git merge <branch>  — merge branch into current
  lesson              — show current challenge
  clear               — clear the terminal
  help                — show this help`, 'info')
    return state
  }

  if (parts[0] === 'lesson') {
    if (currentLesson) {
      addOutput(`Challenge ${currentLesson.id}: ${currentLesson.title}\n${currentLesson.desc}\nHint: ${currentLesson.hint}`, 'info')
    } else {
      addOutput('All challenges completed! You are a Git master.', 'success')
    }
    return state
  }

  const cmd = parts[1]
  let newState = { ...state }

  switch (cmd) {
    case 'status': {
      const staged   = state.stagedFiles.length   > 0 ? `\nChanges to be committed:\n${state.stagedFiles.map(f => `  \x1b[32mnew file: ${f}\x1b[0m`).join('\n')}` : ''
      const unstaged = state.unstagedFiles.length > 0 ? `\nChanges not staged for commit:\n${state.unstagedFiles.map(f => `  modified: ${f}`).join('\n')}` : ''
      const clean    = staged === '' && unstaged === ''
      addOutput(
        `On branch ${state.branch}\n${clean ? 'nothing to commit, working tree clean' : staged + unstaged}`,
        'output'
      )
      break
    }

    case 'add': {
      const target = parts[2]
      if (!target) { addOutput('Usage: git add <file> or git add .', 'error'); break }
      if (target === '.') {
        newState.stagedFiles   = [...new Set([...state.stagedFiles, ...state.unstagedFiles])]
        newState.unstagedFiles = []
        addOutput(`Staged ${state.unstagedFiles.length} file(s).`, 'success')
      } else if (state.unstagedFiles.includes(target)) {
        newState.stagedFiles   = [...new Set([...state.stagedFiles, target])]
        newState.unstagedFiles = state.unstagedFiles.filter(f => f !== target)
        addOutput(`Staged: ${target}`, 'success')
      } else if (state.stagedFiles.includes(target)) {
        addOutput(`${target} is already staged.`, 'warn')
      } else {
        addOutput(`pathspec '${target}' did not match any files.`, 'error')
      }
      break
    }

    case 'commit': {
      if (parts[2] !== '-m') { addOutput('Usage: git commit -m "your message"', 'error'); break }
      const msg = parts.slice(3).join(' ').replace(/^["']|["']$/g, '')
      if (!msg) { addOutput('Commit message cannot be empty.', 'error'); break }
      if (state.stagedFiles.length === 0) { addOutput('Nothing to commit. Stage files first with git add.', 'error'); break }
      const hash = Math.random().toString(36).substr(2, 7)
      newState.commits = [...state.commits, { hash, message: msg, branch: state.branch }]
      newState.stagedFiles = []
      addOutput(`[${state.branch} ${hash}] ${msg}\n${state.stagedFiles.length} file(s) changed`, 'success')
      break
    }

    case 'log': {
      const logs = [...state.commits].reverse().map(
        (c, i) => `${i === 0 ? 'commit ' : 'commit '}${c.hash}${i === 0 ? ' (HEAD -> ' + state.branch + ')' : ''}\n  ${c.message}`
      ).join('\n\n')
      addOutput(logs || 'No commits yet.', 'output')
      break
    }

    case 'branch': {
      const name = parts[2]
      if (!name) {
        const list = state.branches.map(b => b === state.branch ? `* ${b}` : `  ${b}`).join('\n')
        addOutput(list, 'output')
      } else if (state.branches.includes(name)) {
        addOutput(`fatal: A branch named '${name}' already exists.`, 'error')
      } else {
        newState.branches = [...state.branches, name]
        addOutput(`Created branch '${name}'.`, 'success')
      }
      break
    }

    case 'checkout': {
      if (parts[2] === '-b') {
        const name = parts[3]
        if (!name) { addOutput('Usage: git checkout -b <branch>', 'error'); break }
        if (state.branches.includes(name)) { addOutput(`fatal: A branch named '${name}' already exists.`, 'error'); break }
        newState.branches = [...state.branches, name]
        newState.branch = name
        addOutput(`Switched to a new branch '${name}'.`, 'success')
      } else {
        const name = parts[2]
        if (!name) { addOutput('Usage: git checkout <branch>', 'error'); break }
        if (!state.branches.includes(name)) { addOutput(`error: pathspec '${name}' did not match any branch.`, 'error'); break }
        newState.branch = name
        addOutput(`Switched to branch '${name}'.`, 'success')
      }
      break
    }

    case 'push': {
      const remote = parts[2]
      const branch = parts[3] || state.branch
      if (remote !== 'origin') { addOutput(`fatal: '${remote}' does not appear to be a git repository.`, 'error'); break }
      if (!state.branches.includes(branch)) { addOutput(`error: src refspec '${branch}' does not match any.`, 'error'); break }
      newState.remoteBranches = [...new Set([...state.remoteBranches, branch])]
      const latest = [...state.commits].filter(c => c.branch === branch).pop()
      newState.lastPushed = latest?.hash || state.lastPushed
      addOutput(`Branch '${branch}' pushed to origin.\nTo https://github.com/yourrepo.git\n  ${state.lastPushed}..${latest?.hash || state.lastPushed}  ${branch} -> ${branch}`, 'success')
      break
    }

    case 'pull': {
      addOutput(`Already up to date.\nFrom https://github.com/yourrepo.git\n* branch ${state.branch} -> FETCH_HEAD`, 'output')
      break
    }

    case 'stash': {
      if (parts[2] === 'pop') {
        if (state.stash.length === 0) { addOutput('No stash entries found.', 'error'); break }
        const top = state.stash[state.stash.length - 1]
        newState.unstagedFiles = [...new Set([...state.unstagedFiles, ...top])]
        newState.stash = state.stash.slice(0, -1)
        addOutput(`Applied stash: stash@{0}\nRestored: ${top.join(', ')}`, 'success')
      } else {
        if (state.stagedFiles.length === 0 && state.unstagedFiles.length === 0) {
          addOutput('No local changes to save.', 'warn'); break
        }
        newState.stash = [...state.stash, [...state.stagedFiles, ...state.unstagedFiles]]
        newState.stagedFiles = []
        newState.unstagedFiles = []
        addOutput(`Saved working directory state to stash@{${state.stash.length}}.`, 'success')
      }
      break
    }

    case 'diff': {
      if (state.unstagedFiles.length === 0) {
        addOutput('No changes to show.', 'output')
      } else {
        addOutput(state.unstagedFiles.map(f => `diff --git a/${f} b/${f}\n+++ b/${f}\n+ [modified content]`).join('\n\n'), 'output')
      }
      break
    }

    case 'reset': {
      if (parts[2] === 'HEAD') {
        const file = parts[3]
        if (!file) { addOutput('Usage: git reset HEAD <file>', 'error'); break }
        if (!state.stagedFiles.includes(file)) { addOutput(`${file} is not staged.`, 'error'); break }
        newState.stagedFiles   = state.stagedFiles.filter(f => f !== file)
        newState.unstagedFiles = [...state.unstagedFiles, file]
        addOutput(`Unstaged: ${file}`, 'success')
      } else {
        addOutput('Usage: git reset HEAD <file>', 'error')
      }
      break
    }

    case 'merge': {
      const target = parts[2]
      if (!target) { addOutput('Usage: git merge <branch>', 'error'); break }
      if (!state.branches.includes(target)) { addOutput(`merge: '${target}' - not something we can merge`, 'error'); break }
      if (target === state.branch) { addOutput('Already up to date.', 'warn'); break }
      addOutput(`Merging '${target}' into '${state.branch}'...\nFast-forward\nAlready up to date.`, 'success')
      break
    }

    default:
      addOutput(`git: '${cmd}' is not a git command. Type 'help' to see available commands.`, 'error')
  }

  return newState
}

// ── Main component ─────────────────────────────────────────────────
export default function GitSimulator() {
  const [gitState, setGitState]       = useState(INITIAL_STATE)
  const [history, setHistory]         = useState([])  // terminal output lines
  const [input, setInput]             = useState('')
  const [cmdHistory, setCmdHistory]   = useState([])  // up-arrow history
  const [historyIdx, setHistoryIdx]   = useState(-1)
  const [lessonIdx, setLessonIdx]     = useState(0)
  const [completedLessons, setCompleted] = useState([])
  const [showCongrats, setShowCongrats] = useState(false)
  const terminalRef = useRef(null)
  const inputRef    = useRef(null)

  const currentLesson = lessonIdx < LESSONS.length ? LESSONS[lessonIdx] : null
  const prevStateRef  = useRef(gitState)

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current)
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
  }, [history])

  // Focus input on click anywhere in terminal
  const focusInput = () => inputRef.current?.focus()

  const addOutput = (text, type = 'output') => {
    setHistory(h => [...h, { text, type, id: Date.now() + Math.random() }])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const cmd = input.trim()
    if (!cmd) return

    // Echo the command
    setHistory(h => [...h, { text: `${gitState.branch} $ ${cmd}`, type: 'cmd', id: Date.now() }])
    setCmdHistory(h => [cmd, ...h])
    setHistoryIdx(-1)
    setInput('')

    // Execute
    const prev = { ...gitState }
    const result = executeCommand(cmd, gitState, setGitState, addOutput, currentLesson, prev)

    if (result === '__clear__') {
      setHistory([])
      return
    }

    if (result && result !== gitState) {
      setGitState(result)
      prevStateRef.current = prev

      // Check lesson completion
      if (currentLesson && currentLesson.check(result, prev)) {
        setTimeout(() => {
          addOutput(`✓ Challenge complete: ${currentLesson.successMsg}`, 'success')
          setCompleted(c => [...c, currentLesson.id])
          if (lessonIdx + 1 < LESSONS.length) {
            setTimeout(() => {
              const next = LESSONS[lessonIdx + 1]
              addOutput(`\nNext challenge: ${next.title}\n${next.desc}`, 'lesson')
              setLessonIdx(i => i + 1)
            }, 800)
          } else {
            setTimeout(() => {
              addOutput('\n🎉 All challenges completed! You are a Git master.', 'success')
              setShowCongrats(true)
            }, 800)
          }
        }, 200)
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const idx = Math.min(historyIdx + 1, cmdHistory.length - 1)
      setHistoryIdx(idx)
      setInput(cmdHistory[idx] || '')
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const idx = Math.max(historyIdx - 1, -1)
      setHistoryIdx(idx)
      setInput(idx === -1 ? '' : cmdHistory[idx])
    }
  }

  // Color map for output types
  const typeColor = {
    cmd:     'var(--acc)',
    output:  'var(--txt2)',
    success: '#00FFB2',
    error:   '#FF6B35',
    warn:    '#FFD700',
    info:    '#4285F4',
    lesson:  '#A855F7',
  }

  return (
    <div style={{ width: '100%', maxWidth: 720 }}>

      {/* Progress bar */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span className="section-label">// CHALLENGES</span>
          <span style={{ fontSize: 10, color: 'var(--txt3)', fontFamily: "'JetBrains Mono',monospace" }}>
            {completedLessons.length}/{LESSONS.length} completed
          </span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {LESSONS.map(l => (
            <div key={l.id} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: completedLessons.includes(l.id)
                ? 'var(--acc)'
                : l.id === currentLesson?.id
                  ? 'rgba(0,255,178,0.3)'
                  : 'var(--bdr)',
              transition: 'background 0.4s ease',
            }} />
          ))}
        </div>
      </div>

      {/* Current challenge card */}
      {currentLesson && !showCongrats && (
        <div style={{
          padding: '14px 16px', marginBottom: 12,
          background: 'rgba(168,85,247,0.08)',
          border: '1px solid rgba(168,85,247,0.25)',
          borderRadius: 10,
        }}>
          <div style={{ fontSize: 10, color: 'var(--acc2)', fontFamily: "'JetBrains Mono',monospace", letterSpacing: '.1em', marginBottom: 4 }}>
            CHALLENGE {currentLesson.id} OF {LESSONS.length}
          </div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '1rem', color: 'var(--txt)', marginBottom: 4 }}>
            {currentLesson.title}
          </div>
          <div style={{ fontSize: 12, color: 'var(--txt2)', fontFamily: "'Space Mono',monospace", lineHeight: 1.5, marginBottom: 8 }}>
            {currentLesson.desc}
          </div>
          <div style={{ fontSize: 11, color: 'var(--acc2)', fontFamily: "'JetBrains Mono',monospace" }}>
            💡 {currentLesson.hint}
          </div>
        </div>
      )}

      {showCongrats && (
        <div style={{
          padding: '20px', marginBottom: 12, textAlign: 'center',
          background: 'rgba(0,255,178,0.08)', border: '1px solid rgba(0,255,178,0.3)',
          borderRadius: 10,
        }}>
          <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>🎉</div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '1.1rem', color: 'var(--acc)' }}>
            Git Master Unlocked!
          </div>
          <div style={{ fontSize: 12, color: 'var(--txt2)', fontFamily: "'Space Mono',monospace", marginTop: 6 }}>
            You completed all challenges. Keep exploring in the terminal below.
          </div>
          <button onClick={() => { setGitState(INITIAL_STATE); setHistory([]); setLessonIdx(0); setCompleted([]); setShowCongrats(false) }}
            style={{ marginTop: 12, padding: '8px 20px', background: 'var(--acc)', color: 'var(--bg)', border: 'none', borderRadius: 8, fontFamily: "'Space Mono',monospace", fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
            Restart
          </button>
        </div>
      )}

      {/* Terminal */}
      <div onClick={focusInput} style={{
        background: '#0a0a0f',
        border: '1px solid var(--bdr)',
        borderRadius: 10,
        overflow: 'hidden',
        fontFamily: "'JetBrains Mono',monospace",
      }}>
        {/* Terminal title bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', borderBottom: '1px solid var(--bdr)', background: '#0d0d14' }}>
          {['#FF5F57','#FEBC2E','#28C840'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
          <span style={{ marginLeft: 8, fontSize: 11, color: 'var(--txt3)' }}>git-simulator — bash</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
            {/* Repo state badges */}
            <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 4, background: 'rgba(0,255,178,0.1)', color: 'var(--acc)', border: '1px solid rgba(0,255,178,0.2)' }}>
              branch: {gitState.branch}
            </span>
            {gitState.stagedFiles.length > 0 && (
              <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 4, background: 'rgba(255,215,0,0.1)', color: '#FFD700', border: '1px solid rgba(255,215,0,0.2)' }}>
                staged: {gitState.stagedFiles.length}
              </span>
            )}
          </div>
        </div>

        {/* Output area */}
        <div ref={terminalRef} style={{
          height: 320, overflowY: 'auto',
          padding: '12px 16px',
          fontSize: 12, lineHeight: 1.7,
        }}>
          {/* Welcome message */}
          {history.length === 0 && (
            <div style={{ color: 'var(--txt3)', marginBottom: 8 }}>
              <div style={{ color: 'var(--acc)', fontWeight: 700, marginBottom: 4 }}>Git Command Simulator</div>
              <div>Type <span style={{ color: 'var(--acc)' }}>help</span> to see all commands.</div>
              <div>Type <span style={{ color: 'var(--acc)' }}>lesson</span> to see the current challenge.</div>
              <div style={{ marginTop: 8, color: '#A855F7' }}>
                Challenge 1: {LESSONS[0].title} — {LESSONS[0].desc}
              </div>
              <div style={{ color: '#A855F7', marginTop: 2 }}>💡 {LESSONS[0].hint}</div>
              <div style={{ borderTop: '1px solid var(--bdr)', marginTop: 10, paddingTop: 4 }} />
            </div>
          )}

          {history.map(line => (
            <div key={line.id} style={{
              color: typeColor[line.type] || 'var(--txt2)',
              whiteSpace: 'pre-wrap', wordBreak: 'break-word',
              marginBottom: line.type === 'cmd' ? 2 : 6,
              fontWeight: line.type === 'cmd' ? 600 : 400,
            }}>
              {line.text}
            </div>
          ))}

          {/* Input line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <span style={{ color: 'var(--acc)', whiteSpace: 'nowrap', fontWeight: 600 }}>
              {gitState.branch} $
            </span>
            <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex' }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                style={{
                  flex: 1, background: 'transparent', border: 'none',
                  outline: 'none', color: 'var(--txt)',
                  fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
                  caretColor: 'var(--acc)',
                }}
              />
            </form>
          </div>
        </div>
      </div>

      {/* Quick reference */}
      <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {['git status','git add .','git commit -m "msg"','git log','git branch','git push origin main'].map(cmd => (
          <button key={cmd} onClick={() => { setInput(cmd); inputRef.current?.focus() }}
            style={{
              fontSize: 10, padding: '4px 10px',
              fontFamily: "'JetBrains Mono',monospace",
              background: 'var(--glass)', border: '1px solid var(--bdr)',
              borderRadius: 6, color: 'var(--txt2)', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.borderColor = 'var(--acc)'; e.target.style.color = 'var(--acc)' }}
            onMouseLeave={e => { e.target.style.borderColor = 'var(--bdr)'; e.target.style.color = 'var(--txt2)' }}
          >
            {cmd}
          </button>
        ))}
      </div>

    </div>
  )
}
