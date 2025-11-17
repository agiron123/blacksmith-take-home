import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function NotFoundPage() {
  return (
    <div className="container mx-auto p-8 text-center">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-6xl font-bold text-muted-foreground">404</CardTitle>
          <CardTitle>Page Not Found</CardTitle>
          <CardDescription>The page you're looking for doesn't exist.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link to="/">Go Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
