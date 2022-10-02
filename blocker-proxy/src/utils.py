import sys
from os import path
def get_filepath(relative_filepath: str) -> str:
    """
    Get a local file's path both in script mode or EXE mode.

    Args:
        relative_filepath (str): Relative path to the file needed
    Returns:
        str: Absolute path for the file.
    """
    if getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS'):
        return path.join(path.dirname(sys.executable), relative_filepath)
    return relative_filepath
