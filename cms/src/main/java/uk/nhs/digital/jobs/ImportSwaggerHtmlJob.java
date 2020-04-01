
package uk.nhs.digital.jobs;

import javax.jcr.*;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.Executors;
import java.util.function.Consumer;
import org.onehippo.repository.scheduling.RepositoryJob;
import org.onehippo.repository.scheduling.RepositoryJobExecutionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ImportSwaggerHtmlJob implements RepositoryJob {

    private static final Logger LOGGER = LoggerFactory.getLogger(ImportSwaggerHtmlJob.class);
    private static final String CODEGEN_LIB_PATH_PARAM_NAME = "swaggerCodegenLibPath";
    // /Users/leemoody/IdeaProjects/hippo
    private static final String TEMPLATE_PATH_PARAM_NAME = "templatePath";
    // e.g. "./repository-data/webfiles/src/main/resources/swagger-templates/html2-freemarker/htmlDocs2/"
    private static final String TEMPLATE_TYPE_PARAM_NAME = "templateType";
    // e.g. html or html2
    private static final String FILE_DESTINATION_PATH_PARAM_NAME = "fileDestinationPath";
    //repository-data/webfiles/src/main/resources/site/swagger/output";
    private static final String OAS_PATH_PARAM_NAME= "oaspath";

    private static final String LOG_FILES_PATH_PARAM_NAME = "logFilesPath";
  //   /Users/leemoody/IdeaProjects/hippo/logs

    @Override
    public void execute(RepositoryJobExecutionContext context) throws RepositoryException {
        Session session = context.createSession(new SimpleCredentials("admin", "admin".toCharArray()));

        try {
            executeSwaggerCodegen(context);
            createFileNodes(context);
        } catch(IOException | InterruptedException ex){
            LOGGER.error(ex.getMessage());
            ex.printStackTrace();
        }

    }

    private void executeSwaggerCodegen(RepositoryJobExecutionContext context) throws IOException, InterruptedException {
    LOGGER.info("executeSwaggerCodegen: ...");
        final String oasPath = context.getAttribute(OAS_PATH_PARAM_NAME);
        final String templatePath = context.getAttribute(TEMPLATE_PATH_PARAM_NAME);
        final String templateType = context.getAttribute(TEMPLATE_TYPE_PARAM_NAME);
        final String destinationPath = context.getAttribute(FILE_DESTINATION_PATH_PARAM_NAME);
        final String swaggerCodegenLibPath = context.getAttribute(CODEGEN_LIB_PATH_PARAM_NAME);
        final String logFilesPath = context.getAttribute(LOG_FILES_PATH_PARAM_NAME);
        ProcessBuilder builder = new ProcessBuilder();
        builder.command("java", "-jar", "./lib/swagger-codegen-cli.jar", "generate",
            "-i", oasPath,
            "-l",templateType,
            "-t",templatePath,
            "-o", destinationPath);


        builder.directory(new File(swaggerCodegenLibPath));

        Path logsPath = Paths.get(logFilesPath);

        Files.createDirectories(logsPath);
        Path outputLogPath = logsPath.resolve("generator-output.log");
        File outputLogFile = getFile(outputLogPath);
        builder.redirectOutput(outputLogFile);

        Path errorLogPath = logsPath.resolve("generator-error.log");
        File errorLogFile = getFile(errorLogPath);
        builder.redirectError(errorLogFile);

        Process process = builder.start();

        StreamGobbler streamGobbler =
            new StreamGobbler(process.getInputStream(), System.out::println);
        Executors.newSingleThreadExecutor().submit(streamGobbler);
        int exitCode = process.waitFor();
        assert exitCode == 0;
    }

    private File getFile(Path logPath) throws IOException {
        File logFile;
        if (!Files.exists(logPath)){
           logFile = Files.createFile(logPath).toFile();
        } else{
            logFile = logPath.toFile();
        }
        return logFile;
    }

    private void createFileNodes(RepositoryJobExecutionContext context) throws RepositoryException, IOException {
        Session session = context.createSession(new SimpleCredentials("admin", "admin".toCharArray()));

        final String destinationPath = context.getAttribute(FILE_DESTINATION_PATH_PARAM_NAME);
        final Path swaggerHtmlPath = Paths.get(destinationPath, "index.html");
        final Path swaggerCssPath = Paths.get(destinationPath, "docs", "assets","css");
        final Path swaggerJsPath = Paths.get(destinationPath, "docs", "assets","js");
        try {
            createFileNode(session, swaggerHtmlPath, "webfiles/site/freemarker/common/swagger", "pds.ftl", "application/octet-stream");

            Files.list(swaggerCssPath).forEach(path -> createFileNode(session, path, "webfiles/site/css/swagger", path.getFileName().toString(), "text/css"));
            Files.list(swaggerJsPath).forEach(path -> createFileNode(session, path, "webfiles/site/js/swagger", path.getFileName().toString(), "application/javascript"));
            session.save();
        }finally {
            session.logout();
        }

    }


    private void createFileNode(final Session session, final Path filePath, final String destinationNodePath, final String destinationFileName, final String mimeType) {

        if (!Files.exists(filePath)) {
            LOGGER.error("File at : %s not found", filePath.toString());
        }

        File file = filePath.toFile();
        try (InputStream inputStream = new FileInputStream(file)) {

            Node nodePath = getNodePath(session, destinationNodePath);

            // Remove if already exists.
            if (nodePath.hasNode(destinationFileName)) {
                nodePath.getNode(destinationFileName).remove();
            }

            Node fileNode = nodePath.addNode(destinationFileName, "nt:file");

            Node dataNode = fileNode.addNode("jcr:content", "nt:resource");
            dataNode.setProperty("jcr:mimeType", mimeType);
            dataNode.addMixin("mix:lastModified");

            ValueFactory factory = session.getValueFactory();

            Binary binary = factory.createBinary(inputStream);
            Value value = factory.createValue(binary);
            dataNode.setProperty("jcr:data", value);
        } catch (IOException | RepositoryException e){
            LOGGER.error("Exception trying to create file node: ", e.getMessage());
            e.printStackTrace();
        }
    }

    private Node getNodePath(Session session, String destinationNodePath) throws RepositoryException {
        Node nodePath = null;
        if (!session.getRootNode().hasNode(destinationNodePath)) {
            nodePath = session.getRootNode().addNode(destinationNodePath , "nt:folder");
        } else {
            nodePath = session.getRootNode().getNode(destinationNodePath);
        }
        return nodePath;
    }


    private static class StreamGobbler implements Runnable {
        private InputStream inputStream;
        private Consumer<String> consumer;

        public StreamGobbler(InputStream inputStream, Consumer<String> consumer) {
            this.inputStream = inputStream;
            this.consumer = consumer;
        }

        @Override
        public void run() {
            new BufferedReader(new InputStreamReader(inputStream)).lines()
                .forEach(consumer);
        }
    }


}

