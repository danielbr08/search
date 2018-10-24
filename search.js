const path = require('path');
const fs = require('fs');
const dirPath = path.resolve("")// Get current fullpath

var exp = process.argv[2];// Get first parameter
var ext = process.argv[3];// Get second parameter

function findFilesNest(dir, ext, exp) {

	if( typeof ext === 'undefined' || typeof exp === 'undefined' )// No input case
	{
		console.log('USAGE: node search [EXT] [TEXT]');
		return;
	}
	ext = "." + ext;
    const extFiles = getExtFiles(dir, ext);// Get only files with suffix ext(parameter) 
	const expFiles = getExpFiles(dir,extFiles)
	
	if(expFiles.length == 0){
		console.log("No file was found!");}
	else{
		for(var i in expFiles)
			console.log(expFiles[i]);
		}	
}

function getExtFiles(dir, ext) {
    let files = [];//local list
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);// Will be dir/file
        const stat = fs.lstatSync(filePath);

        if (stat.isDirectory())// Get only the files. If directory, we take all the files in the directory and sub directories.
		{
			files = files.concat(getExtFiles(filePath, ext));// Append the nested files
		}
		else
		{
            if (path.extname(file) === ext)// If required extended
			{
                files.push(filePath);
            }
        }
    });
    return files;
}

function getExpFiles(dir,extFilesList){
	let expFiles = []
	extFilesList.forEach(file => {
    const fileContent = fs.readFileSync(file);// Get the file content

    const regex = new RegExp('\\b' + exp + '\\b' );//Find a match of a word
    if (regex.test(fileContent)) {
		const filePath = path.join("", file);
		expFiles.push(filePath);
        }
    });
	return expFiles;
}

findFilesNest(dirPath, ext, exp)