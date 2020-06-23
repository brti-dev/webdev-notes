# Git

'commit': snapshot of a project
'fork': use an existing project as a starting point for your own
'clone': downloads your fork onto local machine
'remote': a repository stored on another computer (GitHub's server).
 - It is standard practice (and also the default when you clone a repository) to give the name `origin` to the remote that points to your main offsite repository (for example, your GitHub repository).
'branch': the way to work on different parts of a repository at one time; a lightweight movable pointer to a commit
 - ie keeping bug fixes and feature work separate from the `master` (default/production) branch
 - branches later merged into `master` after changes/commits/discussion
 - creating a branch merely creates that branch; the current working (`HEAD`) branch is still `master` (or whatever branch you are currently working from) (switch branches with the $ git checkout <branch> command)
'tracked': file in a previous commit that Git knows about
'Modified': you have changed the file but have not committed it to your database yet
'Committed': the data is safely stored in your local database
'Staged': you have marked a modified file in its current version to go into your next commit snapshot

## Basic work flow

  $ git add foo.txt      // tree -> stage
  $ git commit           //         stage -> history
  $ git reset foo.txt    //         stage <- history // $ git reset --soft HEAD~1 to restage everything but keep changes
  $ git checkout foo.txt // tree <- stage
  $ git checkout HEAD    // tree <---------- history

  $ git diff             // tree >< stage            // changed since the last checkpoint but not staged
  $ git diff --staged    //         stage >< history // compare staged changes to last commit
  $ git diff HEAD~1      // tree ><          history // changed since the last commit

`git checkout .` reverts to the last checkpoint
`git checkout head .` reverts to the last commit
`git stash` and `git checkout -m -b` operate on the changes since the last commit

## Commands

$ git init
      status
      add <FILENAMES> //stage files
          -A //Default behavior, like above
          -u //stage only modified files record all modifications of tracked files in the working tree and record all removals of files that have been removed from the working tree with rm (as opposed to git rm)
          -u //Stages only Modified Files
          . //Stages everything, without Deleted Files
      ls-files //list all currently tracked files
          <filename> //check if a specific file is being tracked
      ls-tree -r <branchname> //list all files being tracked by a specific branch
      reset //re-stage everything from the last commit, leaving changes in the working tree
            <FILES>
            HEAD <FILENAME> //unstage a file
            --soft HEAD~1 //restage everything but keep changes
            --hard HEAD~1 //undo commit & restore everything in the working dir
      commit
          -v //output diff details in editor
          -m "<DESCRIPTION>" //commit message; add `[ci skip]` to the description to skip Travis Ci build
          -a //automatically commit all tracked files (need not be staged) //ie $ git commit -a -m "added new benchmarks"
          --amend //take everything staged and amend it to last commit; or if nothing staged just amend the commit message
      log
          -p [-<NUMTOSHOW>]//diff (details)
          --oneline
          //also $ gitk for a gui of logs
      remote
          -v //verbose
          add <SHORTNAME> <URL> //ie > git remote add origin https://github.com/try-git/try_git.git
          set-url <REMOTENAME> <URL> //Edit remote URL
      push -u <SHORTNAME> master //ie > git push -u origin master //-u: recall command, so next time "$ git push" should work
      pull <SHORTNAME> master //ie > git pull origin master
      diff HEAD
          --staged --cached //compares your staged changes to your last commit
      branch <BRANCHNAME> //create new branch //ie $ git branch cleanup //then: git checkout cleanup
          -d <BRANCHNAME> //delete branch
          -v //view the last commit on each branch
          --merged //Branches on this list without the * in front of them are generally fine to delete; you’ve already incorporated their work into another branch
          -m <OLDBRANCHNAME> <NEWBRANCHNAME>
      checkout //Checkout a branch or paths to the working tree
          -b //Create & checkout = $ git branch <branchname> && git checkout <branchname>
          -- <FILES> //throw away local changes
      //after making changes, ie:
      rm <filename/glob> //remove the file from BOTH the staging area and local folder
          --cached //rm from just the staging area (don't track the file anymore)
      mv <fromfilename> <tofilename>
      //commit the changes, then checkout back to master branch and merge the branches
      merge <BRANCHNAME> //ie > git merge cleanup
      mergetool //GUI for solving merge conflicts
      //then delete the branch: > git branch -d cleanup
      //and push the changes to the thing > git push [Recall we used > git push -u earlier so we can shorthand it here
      config --global credential.helper cache // don't keep typing password; more: https://git-scm.com/book/en/v2/Git-Tools-Credential-Storage

## .gitignore

` # a comment - this is ignored
  # no .a files
  *.a
  # but do track lib.a, even though you're ignoring .a files above
  !lib.a
  # only ignore the root TODO file, not subdir/TODO
  /TODO
  # ignore all files in the build/ directory
  build/
  # ignore doc/notes.txt, but not doc/server/arch.txt
  doc/*.txt
  # ignore all .txt files in the doc/ directory & children
  doc/**/*.txt
  # ignore all files ending in .o or .a
  *.[oa]
  # all files ending in a tilde
  *~
  # ? for single char
  f?o.txt`

## Working with branches
  $ git branch testing // or $ git checkout -b testing
At this point, HEAD is still pointing to `master` which can be confirmed:
  $ git log --oneline --decorate
Switch to the new branch:
  $ git checkout testing
Make some changes... then commit: (EVERYTHING STAGED WILL BE COMMITTED!)
  $ git commit -a -m 'made a change'
HEAD and `testing` now move forward, though `master` still points to the previous commit
Add `--all` to the `git log` command to see all the branches
  $ git log --oneline --decorate --all
Move HEAD back to the `master` branch; This also _reverts files back to that snapshot_
  $ git checkout master
Merge changes:
  $ git merge testing
Delete the branch since we're done with it:
  $ git branch -d testing
If at the merge there was a conflict, resolve it by making changes to the file, or use `mergetool`:
  $ git mergetool
After fixing conflicts:
  $ git commit

## Fetching from remote
Download remote branches
  $ git fetch origin
See what commits have been added upstream
  $ git log --oneline master..origin/master
Approve the changes and merge them into your local master branch with the following commands:
  $ git checkout master
  $ git log origin/master
Merge
  $ git merge origin/master

## SSH
  $ eval `ssh-agent -s`
  $ ssh-add ~/.ssh/id_rsa // input password to save session

## Tricks

### Delete a file from local repository but no remote
1. Add all the files, individually or in a folder, that you want to remove from the repo but keep locally to .gitignore.
2. Execute git rm --cached put/here/your/file.ext for each file or git rm --cached folder/\* if they are in a folder. (It is /\* because you need to escape the *)
3. Commit your changes.
4. Push to remote.

### Replace local changes
In case you did something wrong you can replace local changes using the command
  $ git checkout -- <filename>
...this replaces the changes in your working tree with the last content in HEAD. Changes already added to the index, as well as new files, will be kept.
If you instead want to drop all your local changes and commits, fetch the latest history from the server and point your local master branch at it like this
  $ git fetch origin
  $ git reset --hard origin/master

### Choose certain hunks interactively
  $ git add -p
  $ git checkout -p //from the last commit
  $ git reset -p //choose certain

### Ammend something to the last commit
  $ git commit -m 'initial commit'
  $ git add forgotten_file
  $ git commit --amend
or force the amended commit (this can cause conflicts if someone else pulls the commit in the meantime!)
  $ git commit --amend --no-edit
  $ git push -f