import styles from "./root.module.css";
import ExchangeForm from "@/components/ExchangeForm/ExchangeForm";
import ExchangeTimer from "@/components/ExchangeTimer/ExchangeTimer";
import getExchangeRate from "@/utils/getExchangeRate";

export default async function Home() {
	let exchangeRate;
	try {
		exchangeRate = await getExchangeRate();
	} catch {
		return (
			<div className={styles.homepage}>
				<h1>Exchange <span className={styles.euro}>EUR</span> to <span className={styles.pln}>PLN</span></h1>
				<p className={styles.errorMessage}>
					We couldn&apos;t load the current exchange rate. Please refresh the page in a moment.
				</p>
			</div>
		);
	}

	return (
		<div className={styles.homepage}>
			<div className={styles.mainContainer}>
				<h1>Exchange <span className={styles.euro}>EUR</span> to <span className={styles.pln}>PLN</span></h1>
				<div className={styles.rateInfo}>
					<p className={styles.rate}>Current exchange rate: <span>{exchangeRate.data.rate}</span></p>
					<ExchangeTimer initialSeconds={exchangeRate.data.secondsLeft} />
				</div>
				<ExchangeForm />
			</div>
		</div>
	);
}