import pandas as pd
path = './resultFiles/PerformanceResults/piggyBankBucks.csv'

def averageDuration(path: str) -> None:
    df = pd.read_csv(path, sep=',', keep_default_na=False)
    avgDuration = df.groupby(['Browser', 'Test Scenario']).mean()
    print(avgDuration)

def main():
    averageDuration(path)

if __name__ == '__main__':
    main()