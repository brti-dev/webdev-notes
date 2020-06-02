# Bash

~/.bash_profile commands to run every time you log into shell
    alias showhidden='ls -a ~'

    $ man <command>
    $ ls  [-l (long list), -a (include hidden) ]
    $ cp <source files or dirs> <target file or dir> [-f(force) -p(preserve) -r(recurse)]
    $ mv <source file> <destination>
    $ rm <file> [-i (prompt)]
    $ rmdir <dir>
    $ less <file> ($ cat <file> | less)
      -> PgDn, PgUp, /<searchquery>, n (find next), q (quit)
    $ du [-s(current directory listing only) -h(human readable)]
    $ find . -name "*.txt" -print
    $ find . -size +1M -ls
    $ xdg-open <file>

Etc
    $ # last part of previous command
    $ mkdir foobar
    $ cd !$

Create a file
    $ touch <filename>
    $ > <filename> //same as rm -f filename && touch filename
    $ printf "some long message\nwith newlines\n" > <filename>

Append
    $ printf "Foo\nBar" >> foo.txt

Searching
$less will highlight query words
    $ less science.txt
    $ /science //search for the keyword "science" in science.txt
$grep prints only lines containing query words
    $ grep [-i -v(no match) -n(line numbers) -c(count lines)] 'science is great' science.txt
$find
    $ find ./ -name foo //find files in the current dir with the name "foo"
$wc word count -- outputs: linecount  wordcount  bytecount
    $ wc science.txt
       4  8  32 science.txttar
To find out how many lines the file has, type
    % wc -l science.txt

Redirecting & piping
> Redirect stdout
    $ cat foo.txt bar.txt > foobar.txt
    $ cat > mycommand
      #!/bin/bash
      echo Hello world. [control-d ends stdout]
    $ chmod u+x mycommand //Give user executable access
    $ ./mycommand
      Hello world.
>> Append stdout
    $ cat >> ~/.bash_aliases
    alias sni='sudo npm install'
< Redirect stdin
    $ sort < foobar.txt //sorts lines in foobar.txt
    $ sort < foobar.txt > sortedfoobar.txt

Packages
    //tar: tape archive (collections of files and whole directory trees))
    $ tar cvf archivename.tar dir //create an archive
    $ tar cvfj archivename.tar.bz2 dir //create a bzip2 compressed archive
    $ tar tv <filename> //view files without extracting
    //gzip: compression
    //bzip2: another compression
    $ bzip2 foo.txt
    $ bunzip2 foo.bz2
Installing
    $ gunzip units-1.74.tar.gz //unzip the gzipped file
    $ tar -xvf units-1.74.tar //extract the contents of the tar file.
Simple package compile:
    $ cd //to the directory containing the package's source code.
    $ mkdir ~/units174
    $ ./configure --prefix=$HOME/units174 //to configure the package for your system.
    $ make //to compile the package.
    $ make check //optional. to run any self-tests that come with the package.
    $ make install //to install the programs and any data files and documentation.
    $ make clean //optional. to remove the program binaries and object files from the source code directory 
The configure utility supports a wide variety of options. You can usually use the --help option to get a list of interesting options for a particular configure script.
The only generic options you are likely to use are the --prefix and --exec-prefix options. These options are used to specify the installation directories.  
The directory named by the --prefix option will hold machine independent files such as documentation, data and configuration files.
The directory named by the --exec-prefix option, (which is normally a subdirectory of the --prefix directory), will hold machine dependent files such as executables.

DEB packages
    $ sudo dpkg -i <packagename.deb> //install package
    $ xdg-open <filename> //open a file with its associate program

Running processes
^C kill
^Z suspend
    $ sleep 1000
    ^Z
    $ bg //run the suspended job in the bg
& at the end of a command to run it in the bg
    $ sleep 1000 &
    $ ps //list processes
list jobs running in the background or suspended
    $ jobs
    $ fg %<jobnumber> //resume suspended job
    $ kill %<jobnumber> //kill a suspended job
Kill processes
    $ ps
    $ kill <processnumber>
Kill programs running
    $ sudo killall <program>
    # sudo xkill //terminator!

Compression
    $ gzip foo.txt
    $ zcat foo.txt.gz //read file without unzipping it
    $ gunzip foo.txt.gz

## SSH

SSH square@squarehaven.com
SSH ninsiteuser@carpenterville.dreamhost.com

## Checkinstall

Instead of
    $ sudo make install
you will use
    $ sudo checkinstall
When called with no arguments, checkinstall will call "make install". If you need other arguments, they can be supplied:
    $ sudo checkinstall make install_package
The installed package can then also easily be removed via Synaptic or via the terminal:
    $sudo dpkg -r packagename
Example:
    $sudo dpkg -r pidgin

# Windows

* Windows Subsystem for Linux https://docs.microsoft.com/en-us/windows/wsl/install-win10

## Powershell

    > New-item|ni <filename> -type ["file", "directory"] -value <"filecont">
    > Rename-Item|rni|ren <oldname> <newname>
    > Add-Conntent|ac <filename> <"filecont">
    > pushd > popd
    > echo "I am a new file.`nNew file line 2" > newfile.txt
    > echo > filename.txt
      blah blah.. blank line + enter to stop writing to filename.txt
    > dir -r
    > dir -r -filter "*.txt"
    > dir -r | more
    > select-string "foo" *.txt
    > Remove-Item -Recurse -Force /dir
    > echo fuuu > bar.txt //write
    > echo uuuu >> bar.txt //append
    
Count number of files in a dir
    > $tmpdir = 'C:\Users\Mathew\AppData\Local\Temp'
    > $files = ls $tmpdir -r | measure-object
    > $files.count

Use `n for newline within <filecont>
