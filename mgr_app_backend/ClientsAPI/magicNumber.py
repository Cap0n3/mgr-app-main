import os

MAGIC_NUMBERS = {
    # List of magic numbers to determine file types.
    # A partial Listing is available at: http://en.wikipedia.org/wiki/List_of_file_signatures
    'jpg' : {'numbers': ['\xFF\xD8\xFF\xDB', '\xFF\xD8\xFF\xEE'], 'offset': 0}
}


def determine_filetype(target_file):
    """
    Reads the headers of a file and determines the file type based on the headers.
    :param target_file: File to check what the file type is
    :return: Short name of the type of file, like gz for gzipped archives, bz2 for bzipped archives. Doesn't make any
             inferences to what is contained in the file in cases of archives, for example a tar.gz file will return
             that it is a gzip archive, but won't know that there is a tar inside of it. Possible Returns: False,
             apk, docx, jar, odp, ods, odt, pptx, xlsx, zip, gz, bz2, tar, rar, 7z, Z (as configured in MAGIC_NUMBERS)
    """
    if not os.path.isfile(target_file):
        # Not a regular file, don't bother.
        print("NOT A REGULAR FILE !")
        return False

    alternate_zips = ['apk', 'docx', 'jar', 'odp', 'ods', 'odt', 'pptx', 'xlsx', 'zipx']
    magic_number_lengths = []
    header_offsets = []
    for file_type in MAGIC_NUMBERS:
        header_offsets.append(MAGIC_NUMBERS[file_type]['offset'])
        for number in MAGIC_NUMBERS[file_type]['numbers']:
            magic_number_lengths.append(len(number))

    header_length = max(magic_number_lengths) + max(header_offsets)

    with open(target_file) as raw_file:
        headers = raw_file.read(header_length)

    for file_type in MAGIC_NUMBERS:
        for magic in MAGIC_NUMBERS[file_type]['numbers']:
            if headers[MAGIC_NUMBERS[file_type]['offset']:].startswith(magic):
                if file_type == 'zip':
                    file_extension = os.path.splitext(target_file)[1][1:]
                    if file_extension in alternate_zips:
                        return file_extension
                return file_type
    return False # No filetypes matched.