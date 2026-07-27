"""
Regenerates all 5 Git documentation diagrams with corrected layout and alignment.
"""
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch
import os

OUT = r'C:\Users\Abhid\Desktop\New folder (2)\assets\screenshots'

BLU = '#3a86c8'
GRN = '#27AE60'
ORG = '#E67E22'
RED = '#C0392B'
PUR = '#7D3C98'
DRK = '#2c3e50'
GRY = '#7f8c8d'
LGY = '#b2bec3'

# ── helpers ───────────────────────────────────────────────────────────────────

def box(ax, cx, cy, w, h, text, fc=BLU, tc='white', fs=9.5, lw=1.4, ec='#1a3a5c'):
    p = FancyBboxPatch((cx-w/2, cy-h/2), w, h,
                       boxstyle='round,pad=0.06',
                       facecolor=fc, edgecolor=ec, linewidth=lw, zorder=3)
    ax.add_patch(p)
    ax.text(cx, cy, text, ha='center', va='center', fontsize=fs,
            color=tc, fontweight='bold', zorder=4,
            multialignment='center', linespacing=1.45)

def diamond(ax, cx, cy, w, h, text, fc=ORG, tc='white', fs=10):
    pts = [(cx, cy+h/2), (cx+w/2, cy), (cx, cy-h/2), (cx-w/2, cy)]
    p = plt.Polygon(pts, closed=True, facecolor=fc,
                    edgecolor='#995500', linewidth=1.4, zorder=3)
    ax.add_patch(p)
    ax.text(cx, cy, text, ha='center', va='center', fontsize=fs,
            color=tc, fontweight='bold', zorder=4)

def arr(ax, x1, y1, x2, y2, color='#333', lw=1.7, style='arc3,rad=0'):
    ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                arrowprops=dict(arrowstyle='->', color=color, lw=lw,
                                connectionstyle=style), zorder=2)

def harr(ax, x1, y, x2, color='#777'):
    ax.annotate('', xy=(x2, y), xytext=(x1, y),
                arrowprops=dict(arrowstyle='->', color=color, lw=1.6), zorder=3)

def lbl(ax, x, y, text, color='#333', fs=9, ha='center', va='center',
        bold=False, bg=None):
    kw = dict(ha=ha, va=va, fontsize=fs, color=color, zorder=5)
    if bold:
        kw['fontweight'] = 'bold'
    if bg:
        kw['bbox'] = dict(boxstyle='round,pad=0.22', fc=bg, ec='none')
    ax.text(x, y, text, **kw)

def node(ax, cx, cy, text, sub='', fc=BLU, sub_above=False, fs=8.5):
    NW, NH = 0.68, 0.52
    p = FancyBboxPatch((cx-NW/2, cy-NH/2), NW, NH,
                       boxstyle='round,pad=0.10',
                       facecolor=fc, edgecolor='white', linewidth=2.0, zorder=4)
    ax.add_patch(p)
    ax.text(cx, cy, text, ha='center', va='center', fontsize=fs,
            color='white', fontweight='bold', zorder=5)
    if sub:
        dy = NH/2 + 0.20
        ax.text(cx, cy+(dy if sub_above else -dy), sub,
                ha='center', va='bottom' if sub_above else 'top',
                fontsize=7.5, color='#333', zorder=5, multialignment='center')

def node_ghost(ax, cx, cy, text):
    NW, NH = 0.68, 0.52
    p = FancyBboxPatch((cx-NW/2, cy-NH/2), NW, NH,
                       boxstyle='round,pad=0.10',
                       facecolor='#d5d8dc', edgecolor='white', linewidth=1.5, zorder=3)
    ax.add_patch(p)
    ax.text(cx, cy, text, ha='center', va='center', fontsize=8.5,
            color='#aaa', fontweight='bold', zorder=4)

def page_title(ax, text):
    ax.text(0.5, 0.975, text, transform=ax.transAxes,
            ha='center', va='top', fontsize=13, fontweight='bold', color='#1a1a2e',
            bbox=dict(boxstyle='round,pad=0.32', fc='#dce8f7', ec=BLU, lw=1.5))


# ══════════════════════════════════════════════════════════════════════════════
#  1  real-21  Git Stash Workflow – Scenario 1
#  FIX: stash stack panel placed in its own column, zero overlap with flow boxes
# ══════════════════════════════════════════════════════════════════════════════
fig, ax = plt.subplots(figsize=(12, 9.5))
ax.set_xlim(0, 12); ax.set_ylim(0, 9.5)
ax.axis('off'); fig.patch.set_facecolor('#f5f7ff'); ax.set_facecolor('#f5f7ff')
page_title(ax, 'Git Stash Workflow  —  Urgent Bug Fix  (Scenario 1)')

BH = 0.66
XC = 5.0
BW = 7.2
steps = [
    (8.65, 'Working on feature/user-profile\nUncommitted changes in profile.js', BLU),
    (7.70, 'Urgent bug reported on main!', RED),
    (6.75, 'git stash\nPark work-in-progress on stash stack', ORG),
    (5.80, 'Working directory is now clean', GRN),
    (4.85, 'git checkout main\ngit checkout -b hotfix/login-crash', BLU),
    (3.90, 'Fix bug  ->  git add  ->  git commit  ->  git push', GRN),
    (2.95, 'git checkout feature/user-profile', BLU),
    (1.90, 'git stash pop\nWIP restored  —  continue feature work', PUR),
]
for (y, t, c) in steps:
    box(ax, XC, y, BW, BH, t, fc=c)
for i in range(len(steps)-1):
    arr(ax, XC, steps[i][0]-BH/2, XC, steps[i+1][0]+BH/2)

# stash stack panel — far right column (x=10.5)
# main flow right edge = 5.0+3.6 = 8.6  |  panel left edge = 10.5-1.35 = 9.15  (gap 0.55)
box(ax, 10.5, 7.00, 2.7, 0.55, 'Stash Stack', fc=DRK, fs=9)
box(ax, 10.5, 6.35, 2.7, 0.50, 'stash@{0}\nWIP: profile.js', fc=GRY, fs=8.0)

# saved: dashed arrow from git stash box right edge -> stash stack panel left edge
ax.annotate('', xy=(10.5-1.35, 6.75),
            xytext=(XC+BW/2, 6.75),
            arrowprops=dict(arrowstyle='->', color=ORG, lw=1.5,
                            linestyle='dashed'))
lbl(ax, 9.3, 6.92, 'saved', color=ORG, fs=8.5, bold=True)

# popped: dashed curved arrow from stash panel back down to git stash pop box
ax.annotate('', xy=(XC+BW/2, 1.90),
            xytext=(10.5-1.35, 6.35),
            arrowprops=dict(arrowstyle='->', color=PUR, lw=1.5,
                            linestyle='dashed',
                            connectionstyle='arc3,rad=0.30'))
lbl(ax, 10.5, 3.80, 'popped\n& removed', color=PUR, fs=8.5, bold=True, ha='center')

plt.tight_layout(rect=[0, 0, 1, 0.97])
plt.savefig(os.path.join(OUT, 'real-21-git-stash-workflow.png'), dpi=140, bbox_inches='tight')
plt.close()
print('real-21  done')


# ══════════════════════════════════════════════════════════════════════════════
#  2  real-22  Multiple Named Stash Workflow – Scenario 2
#  FIX: "git stash list" label placed in the neutral gap between the two sections
# ══════════════════════════════════════════════════════════════════════════════
fig, ax = plt.subplots(figsize=(15, 12))
ax.set_xlim(0, 15); ax.set_ylim(-0.3, 12)
ax.axis('off'); fig.patch.set_facecolor('#f5f7ff'); ax.set_facecolor('#f5f7ff')
page_title(ax, 'Multiple Named Stash Workflow  (Scenario 2)')

# left column  x=3.0, width=4.8
left = [
    (11.10, 'Work on Task 1  (feature/user-profile)',   BLU),
    (10.10, "git stash push -m  'task-1 wip'",           ORG),
    ( 9.10, 'Work on Task 2  (feature/notifications)',   BLU),
    ( 8.10, "git stash push -m  'task-2 wip'",           ORG),
    ( 7.10, 'Work on Task 3  (feature/sidebar)',         BLU),
    ( 6.10, "git stash push -m  'task-3 wip'",           ORG),
]
for (y, t, c) in left:
    box(ax, 3.0, y, 4.8, 0.65, t, fc=c)
for i in range(len(left)-1):
    arr(ax, 3.0, left[i][0]-0.325, 3.0, left[i+1][0]+0.325)

# stash list panel  x=10.8, width=5.8
# left col right edge = 3.0+2.4 = 5.4
# panel left edge     = 10.8-2.9 = 7.9   (gap 2.5 units)
box(ax, 10.8, 10.70, 5.8, 0.62, 'git stash list', DRK, fs=10.5)
stash_rows = [
    ('stash@{0}:  task-3 wip  (most recent)', RED),
    ('stash@{1}:  task-2 wip',                PUR),
    ('stash@{2}:  task-1 wip  (oldest)',       GRN),
]
for i, (t, c) in enumerate(stash_rows):
    box(ax, 10.8, 9.80-i*0.90, 5.8, 0.68, t, fc=c, fs=9.0)

# arrow from last push (right edge 5.4, y=6.10) to stash list panel (left edge 7.9, y=10.70)
ax.annotate('', xy=(7.9, 10.70), xytext=(5.4, 6.10),
            arrowprops=dict(arrowstyle='->', color='#555', lw=1.5,
                            connectionstyle='arc3,rad=-0.25'))
# label in the GAP (x=6.8), clear of both sections
lbl(ax, 6.8, 8.70, 'git stash list', color='#333', fs=9.5, bold=True,
    bg='#f5f7ff')

# inspect
box(ax, 3.0, 4.70, 4.8, 0.72,
    'git stash show -p stash@{1}\nInspect task-2 diff before applying', '#2980b9')
arr(ax, 3.0, 6.10-0.325, 3.0, 4.70+0.36)

# diamond
diamond(ax, 3.0, 3.35, 4.8, 0.88, 'Which action?', ORG, fs=10.5)
arr(ax, 3.0, 4.70-0.36, 3.0, 3.35+0.44)

# apply path
box(ax, 1.2, 2.05, 3.5, 0.70,
    'git stash apply stash@{1}\n(changes restored, stash kept)', GRN, fs=8.8)
box(ax, 1.2, 1.15, 3.5, 0.62,
    'git stash drop stash@{1}\nclean up manually', RED, fs=8.8)
ax.annotate('', xy=(1.2, 2.05+0.35), xytext=(1.65, 3.35-0.44),
            arrowprops=dict(arrowstyle='->', color=GRN, lw=1.5))
lbl(ax, 0.15, 2.70, 'apply', color=GRN, fs=10, bold=True)
arr(ax, 1.2, 2.05-0.35, 1.2, 1.15+0.31)

# pop path
box(ax, 5.3, 2.05, 3.5, 0.70,
    'git stash pop stash@{1}\n(apply + remove in one step)', PUR, fs=8.8)
ax.annotate('', xy=(5.3, 2.05+0.35), xytext=(4.35, 3.35-0.44),
            arrowprops=dict(arrowstyle='->', color=PUR, lw=1.5))
lbl(ax, 6.05, 2.70, 'pop', color=PUR, fs=10, bold=True)

# summary note
box(ax, 10.8, 2.50, 5.8, 1.50,
    'apply  vs  pop\n\n'
    'git stash apply :  restores changes,  stash stays in list\n'
    'git stash pop   :  restores changes,  removes stash from list',
    '#ecf0f1', '#2c3e50', fs=9.2, lw=0.8, ec='#ccc')

plt.tight_layout(rect=[0, 0, 1, 0.97])
plt.savefig(os.path.join(OUT, 'real-22-git-stash-list.png'), dpi=140, bbox_inches='tight')
plt.close()
print('real-22  done')


# ══════════════════════════════════════════════════════════════════════════════
#  3  real-23  Git Rebase Workflow
#  FIX: "repeat per conflict" label placed INSIDE figure (ha='right', x=13.6)
#       loop arrow stays within xlim 0-15
# ══════════════════════════════════════════════════════════════════════════════
fig, ax = plt.subplots(figsize=(15, 10))
ax.set_xlim(0, 15); ax.set_ylim(0, 10)
ax.axis('off'); fig.patch.set_facecolor('#f5f7ff'); ax.set_facecolor('#f5f7ff')
page_title(ax, 'Git Rebase Workflow  —  Updating Feature Branch with Latest main')

# main column  x=4.5, width=7.0
mcol = [
    (9.10, 'git fetch origin\nDownload latest remote commits  (no merge yet)', BLU),
    (7.95, 'git checkout feature/payment-module', BLU),
    (6.80, 'git rebase origin/main\nReplay feature commits on top of main', ORG),
]
for (y, t, c) in mcol:
    box(ax, 4.5, y, 7.0, 0.72, t, fc=c)
for i in range(len(mcol)-1):
    arr(ax, 4.5, mcol[i][0]-0.36, 4.5, mcol[i+1][0]+0.36)

# conflict diamond
diamond(ax, 4.5, 5.55, 5.0, 0.95, 'Conflict?', ORG, fs=11.5)
arr(ax, 4.5, 6.80-0.36, 4.5, 5.55+0.475)

# NO path
box(ax, 4.5, 4.25, 7.0, 0.72, 'Rebase complete  —  linear history achieved', GRN)
box(ax, 4.5, 3.10, 7.0, 0.72,
    'git push --force-with-lease\nSafely push rewritten history to remote', PUR)
ax.annotate('', xy=(1.8, 4.25+0.36), xytext=(1.8, 5.55-0.475),
            arrowprops=dict(arrowstyle='->', color=GRN, lw=1.5))
lbl(ax, 0.90, 4.90, 'No', color=GRN, fs=11, bold=True)
arr(ax, 4.5, 4.25-0.36, 4.5, 3.10+0.36)

# abort box
box(ax, 4.5, 1.80, 7.0, 0.68,
    'git rebase --abort  —  cancel rebase, restore original branch state',
    GRY, fs=9.2)
ax.annotate('', xy=(1.4, 1.80+0.34), xytext=(1.4, 5.55-0.475),
            arrowprops=dict(arrowstyle='->', color=GRY, lw=1.3,
                            linestyle='dashed', connectionstyle='arc3,rad=0.40'))
lbl(ax, 0.55, 3.55, 'Abort?', color=GRY, fs=9.5, bold=True)

# YES path column  x=11.0, width=5.0  (right edge 13.5)
ycol = [
    (5.10, 'Open conflicted file\nResolve markers  (<<<<  ====  >>>>)', RED),
    (3.80, 'git add  resolved-file', GRN),
    (2.50, 'git rebase --continue\nGit replays the next pending commit', ORG),
]
for (y, t, c) in ycol:
    box(ax, 11.0, y, 5.0, 0.75, t, fc=c)
for i in range(len(ycol)-1):
    arr(ax, 11.0, ycol[i][0]-0.375, 11.0, ycol[i+1][0]+0.375)

# Yes label + arrow  (diamond right -> first yes box top)
ax.annotate('', xy=(11.0, 5.10+0.375), xytext=(7.0, 5.55),
            arrowprops=dict(arrowstyle='->', color=RED, lw=1.5))
lbl(ax, 7.85, 5.72, 'Yes', color=RED, fs=11, bold=True)

# loop arrow: right side of YES column -> back to diamond
# goes: bottom of last yes box  ->  right at x=13.8  ->  diamond right side
# keep within x=13.8 (safe inside xlim=15)
loop_x = 13.8
ax.annotate('', xy=(loop_x, 5.55), xytext=(loop_x, 2.50),
            arrowprops=dict(arrowstyle='->', color='#666', lw=1.3))
ax.annotate('', xy=(7.0, 5.55), xytext=(loop_x, 5.55),
            arrowprops=dict(arrowstyle='->', color='#666', lw=1.3))
# "repeat per conflict" label — positioned LEFT of loop_x to stay inside figure
lbl(ax, 13.6, 4.0, 'repeat\nper\nconflict',
    color='#666', fs=8.5, ha='right', va='center')

plt.tight_layout(rect=[0, 0, 1, 0.97])
plt.savefig(os.path.join(OUT, 'real-23-git-rebase-workflow.png'), dpi=140, bbox_inches='tight')
plt.close()
print('real-23  done')


# ══════════════════════════════════════════════════════════════════════════════
#  4  real-24  Merge vs Rebase (side-by-side)
#  FIX: use FancyBboxPatch rounded-rect nodes (no oval distortion)
#       separate subplots with clear x/y ranges
# ══════════════════════════════════════════════════════════════════════════════
fig, (ax_m, ax_r) = plt.subplots(1, 2, figsize=(18, 7.5))
fig.patch.set_facecolor('#f5f7ff')
fig.suptitle('Merge  vs  Rebase  —  Visual Comparison',
             fontsize=15, fontweight='bold', color='#1a1a2e', y=0.97)

NW, NH = 0.72, 0.55   # commit node width, height

def cnode(ax, cx, cy, text, sub='', fc=GRY, sub_above=False):
    p = FancyBboxPatch((cx-NW/2, cy-NH/2), NW, NH,
                       boxstyle='round,pad=0.10',
                       facecolor=fc, edgecolor='white', linewidth=2.2, zorder=4)
    ax.add_patch(p)
    ax.text(cx, cy, text, ha='center', va='center', fontsize=9.5,
            color='white', fontweight='bold', zorder=5)
    if sub:
        dy = NH/2 + 0.20
        ax.text(cx, cy+(-dy if not sub_above else dy), sub,
                ha='center', va='top' if not sub_above else 'bottom',
                fontsize=8.0, color='#333', zorder=5, multialignment='center')

def cnode_ghost(ax, cx, cy, text):
    p = FancyBboxPatch((cx-NW/2, cy-NH/2), NW, NH,
                       boxstyle='round,pad=0.10',
                       facecolor='#d5d8dc', edgecolor='white', linewidth=1.5, zorder=3)
    ax.add_patch(p)
    ax.text(cx, cy, text, ha='center', va='center', fontsize=9.5,
            color='#aaa', fontweight='bold', zorder=4)

def hconn(ax, x1, y, x2, color='#aaa', lw=1.8):
    ax.annotate('', xy=(x2-NW/2, y), xytext=(x1+NW/2, y),
                arrowprops=dict(arrowstyle='->', color=color, lw=lw), zorder=3)

for ax in (ax_m, ax_r):
    ax.set_xlim(0, 11.5); ax.set_ylim(-0.8, 6.5)
    ax.axis('off'); ax.set_facecolor('#f5f7ff')

# ── LEFT: merge ──────────────────────────────────────────────────────────────
ax_m.text(5.75, 6.15, 'git merge  feature  into  main',
          ha='center', va='center', fontsize=12, fontweight='bold', color=RED,
          bbox=dict(boxstyle='round,pad=0.32', fc='#fde8e8', ec=RED, lw=1.5))

ax_m.text(0.38, 4.00, 'main',    ha='center', va='center', fontsize=10.5, color='#333', fontweight='bold')
ax_m.text(0.38, 2.00, 'feature', ha='center', va='center', fontsize=10.5, color=BLU,   fontweight='bold')

mx = [1.3, 2.9, 4.5, 9.0]
ms = ['init', 'setup', 'hotfix\n(teammate)', 'Merge\nCommit']
mf = [GRY, GRY, GRY, RED]
for x, l, s, f in zip(mx, ['C1','C2','C3','M'], ms, mf):
    cnode(ax_m, x, 4.00, l, sub=s, fc=f)
for i in range(2):
    hconn(ax_m, mx[i], 4.00, mx[i+1])
ax_m.annotate('', xy=(mx[3]-NW/2, 4.00), xytext=(mx[2]+NW/2, 4.00),
              arrowprops=dict(arrowstyle='->', color='#aaa', lw=1.8), zorder=3)

# feature branch
ax_m.plot([mx[1], mx[1]], [4.00-NH/2, 2.00+NH/2], color='#bbb', lw=1.6, zorder=2)
fx = [mx[1], 5.2]
for x, l, s in zip(fx, ['F1','F2'], ['add card\nhandler','add\nvalidation']):
    cnode(ax_m, x, 2.00, l, sub=s, fc=BLU)
hconn(ax_m, fx[0], 2.00, fx[1])
ax_m.annotate('', xy=(mx[3]-NW/2*0.6, 4.00-NH/2*0.6),
              xytext=(fx[1]+NW/2, 2.00),
              arrowprops=dict(arrowstyle='->', color=RED, lw=2.2), zorder=2)

box(ax_m, 5.75, -0.45, 11.0, 0.58,
    'History is non-linear  |  Branch fork and merge visible  |  Merge commit added',
    '#f4f6f7', '#333', fs=9.0, lw=0.8, ec='#ccc')

# ── RIGHT: rebase ─────────────────────────────────────────────────────────────
ax_r.text(5.75, 6.15, 'git rebase  main  (on feature branch)',
          ha='center', va='center', fontsize=12, fontweight='bold', color=GRN,
          bbox=dict(boxstyle='round,pad=0.32', fc='#e8f8f0', ec=GRN, lw=1.5))

ax_r.text(0.38, 4.00, 'main', ha='center', va='center', fontsize=10.5, color='#333', fontweight='bold')
ax_r.text(0.38, 2.00, 'feature\n(before)', ha='center', va='center',
          fontsize=9.0, color='#bbb')

rmx = [1.3, 2.9, 4.5]
for x, l, s in zip(rmx, ['C1','C2','C3'],
                    ['init','setup','hotfix\n(teammate)']):
    cnode(ax_r, x, 4.00, l, sub=s, fc=GRY)
for i in range(2):
    hconn(ax_r, rmx[i], 4.00, rmx[i+1])

# replayed commits on main line
rpx = [6.1, 7.9]
ax_r.annotate('', xy=(rpx[0]-NW/2, 4.00), xytext=(rmx[2]+NW/2, 4.00),
              arrowprops=dict(arrowstyle='->', color='#aaa', lw=1.8), zorder=3)
for x, l, s in zip(rpx, ["F1'","F2'"],
                    ['add card\n(replayed)','add validation\n(replayed)']):
    cnode(ax_r, x, 4.00, l, sub=s, fc=GRN)
hconn(ax_r, rpx[0], 4.00, rpx[1])

# ghost original positions
ax_r.plot([rmx[1], rmx[1]], [4.00-NH/2, 2.00+NH/2], color='#e0e0e0', lw=1.4, zorder=2)
ax_r.plot([rmx[1]+NW/2, 4.8-NW/2], [2.00, 2.00], color='#e0e0e0', lw=1.4, zorder=2)
cnode_ghost(ax_r, rmx[1], 2.00, 'F1')
cnode_ghost(ax_r, 4.8,    2.00, 'F2')
ax_r.text(3.4, 1.28, 'original positions before rebase',
          ha='center', va='top', fontsize=8.0, color='#bbb', style='italic')

box(ax_r, 5.75, -0.45, 11.0, 0.58,
    'History is linear  |  No merge commit  |  Commits re-created with new hashes',
    '#f4f6f7', '#333', fs=9.0, lw=0.8, ec='#ccc')

plt.tight_layout(rect=[0, 0.02, 1, 0.94])
plt.savefig(os.path.join(OUT, 'real-24-merge-vs-rebase.png'), dpi=140, bbox_inches='tight')
plt.close()
print('real-24  done')


# ══════════════════════════════════════════════════════════════════════════════
#  5  real-25  Git Cherry-pick Workflow
#  FIX: title only above LEFT half; step panel only on RIGHT half; no overlap
#       C5 well clear of step panel left edge
# ══════════════════════════════════════════════════════════════════════════════
fig, ax = plt.subplots(figsize=(18, 10.5))
ax.set_xlim(0, 18); ax.set_ylim(0, 10.5)
ax.axis('off'); fig.patch.set_facecolor('#f5f7ff'); ax.set_facecolor('#f5f7ff')

# Title centred over LEFT half only  (x=4.5, well clear of step panel left edge ~10)
ax.text(4.5, 10.10, 'Git Cherry-pick Workflow',
        ha='center', va='center', fontsize=14, fontweight='bold', color='#1a1a2e',
        bbox=dict(boxstyle='round,pad=0.32', fc='#dce8f7', ec=BLU, lw=1.5))
ax.text(4.5, 9.50, 'Bug Fix from Release Branch to Main',
        ha='center', va='center', fontsize=10.5, color='#444', fontweight='bold')

# ── release/v2.1 label (x=0.75) + timeline (y=8.0) ──
ax.text(0.75, 8.00, 'release\n/v2.1', ha='center', va='center', fontsize=9.5,
        fontweight='bold', color=ORG,
        bbox=dict(boxstyle='round,pad=0.28', fc='#fff3e0', ec=ORG, lw=1.4))

# commits spread x=2.0 to 8.5  (right edge 8.5+0.34=8.84, step panel left=10.0)
rcx = [2.0, 3.5, 5.0, 6.5, 8.0]
rlb = ['C1', 'C2', 'BF', 'C4', 'C5']
rfc = [GRY, GRY, GRN, LGY, LGY]
rsu = ['', '', 'a7f3e91\nfix login\n* WANTED', 'dark mode\nnot approved', 'checkout\nnot approved']
rab = [False, False, True, False, False]

for x, l, fc_, sub, ab in zip(rcx, rlb, rfc, rsu, rab):
    node(ax, x, 8.00, l, sub=sub, fc=fc_, sub_above=ab)
for i in range(len(rcx)-1):
    harr(ax, rcx[i]+0.34, 8.00, rcx[i+1]-0.34)

# ── main label (x=0.75) + timeline (y=3.8) ──
ax.text(0.75, 3.80, 'main', ha='center', va='center', fontsize=9.5,
        fontweight='bold', color=BLU,
        bbox=dict(boxstyle='round,pad=0.28', fc='#e8f0ff', ec=BLU, lw=1.4))

mcx = [2.0, 3.5, 5.0]
mlb = ['A1', 'A2', 'BF']
mfc = [GRY, GRY, GRN]
msu = ['', '', 'c4d5e6f\nfix login\ncherry-picked']
mab = [False, False, True]

for x, l, fc_, sub, ab in zip(mcx, mlb, mfc, msu, mab):
    node(ax, x, 3.80, l, sub=sub, fc=fc_, sub_above=ab)
for i in range(len(mcx)-1):
    harr(ax, mcx[i]+0.34, 3.80, mcx[i+1]-0.34)

# cherry-pick dashed arrow  BF release (5.0, 8.0) -> BF main (5.0, 3.8)
ax.annotate('', xy=(5.0, 3.80+0.26), xytext=(5.0, 8.00-0.26),
            arrowprops=dict(arrowstyle='->', color=GRN, lw=2.5,
                            linestyle=(0, (5, 3))))
ax.text(5.4, 5.90, 'git cherry-pick  a7f3e91',
        ha='left', va='center', fontsize=9.5, fontweight='bold', color=GRN,
        bbox=dict(boxstyle='round,pad=0.25', fc='#e8f8f0', ec=GRN, lw=1.2))

# ── step-by-step panel  x=13.5, width=6.5  (left edge = 13.5-3.25 = 10.25) ──
# timeline right edge = 8.0+0.34 = 8.34   gap = 10.25-8.34 = 1.91  ✓ no overlap
steps = [
    (9.20, 'git log release/v2.1 --oneline\nIdentify commit hash: a7f3e91', BLU),
    (7.95, 'git checkout main', BLU),
    (6.70, 'git cherry-pick  a7f3e91\nCopy only the bug fix to main', GRN),
    (5.45, 'Conflict?  Resolve file  ->  git add\ngit cherry-pick --continue', ORG),
    (4.20, 'git push origin main', PUR),
]
for (y, t, c) in steps:
    box(ax, 13.5, y, 6.5, 0.80, t, fc=c)
for i in range(len(steps)-1):
    arr(ax, 13.5, steps[i][0]-0.40, 13.5, steps[i+1][0]+0.40)

# abort / skip note
box(ax, 13.5, 2.65, 6.5, 1.15,
    'git cherry-pick --abort\nCancel and restore branch to original state\n\n'
    'git cherry-pick --skip\nSkip current conflicting commit, move to next',
    '#ecf0f1', '#2c3e50', fs=9.0, lw=0.8, ec='#bbb')

# footer
ax.text(6.5, 0.50,
        'Only the selected commit is copied  —  all other commits on release/v2.1 remain untouched',
        ha='center', va='center', fontsize=9.5, color='#555',
        bbox=dict(boxstyle='round,pad=0.28', fc='white', ec='#ccc', lw=1.2))

plt.tight_layout(rect=[0, 0, 1, 0.97])
plt.savefig(os.path.join(OUT, 'real-25-git-cherry-pick.png'), dpi=140, bbox_inches='tight')
plt.close()
print('real-25  done')

print('\nAll 5 diagrams regenerated successfully.')
