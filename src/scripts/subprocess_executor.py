from typing import Optional, Union, List
import subprocess


def executor(cmd: Union[str, List[str]], shell: Optional[bool] = False) -> int:
    process = subprocess.run(
        cmd, shell=shell, stdout=subprocess.PIPE, stderr=subprocess.STDOUT
    )
    for line in process.stdout.decode().split("\n"):
        print(line)
    
    return process.returncode
