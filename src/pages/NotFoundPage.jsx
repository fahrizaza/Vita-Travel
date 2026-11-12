import Button from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <>
      <title>Page not found | Vita Travel</title>
      <div className="page-padding">
        <div className="legal-intro padding-global">
          <div className="container">
            <div className="legal-intro__in">
              <div className="margin-bottom-16 mobile-margin-bottom-8">
                <div data-anim="fade-up" className="h2 line-height-100">
                  Page not found
                </div>
              </div>
              <div className="margin-bottom-24">
                <div data-anim-delay="0.1" data-anim="fade-up" className="body-xl color-white-60">
                  The page you are looking for does not exist or has been moved.
                </div>
              </div>
              <div data-anim-delay="0.2" data-anim="fade-up">
                <Button kind="primary" variant="full-width-mobile" to="/">
                  Go Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
