package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.DmDocumentLinks;
import com.infostudio.ba.repository.DmDocumentLinksRepository;
import com.infostudio.ba.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.infostudio.ba.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DmDocumentLinksResource REST controller.
 *
 * @see DmDocumentLinksResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class DmDocumentLinksResourceIntTest {

    private static final String DEFAULT_DOCUMENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_FILE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FILE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_FILE_PATH = "AAAAAAAAAA";
    private static final String UPDATED_FILE_PATH = "BBBBBBBBBB";

    private static final String DEFAULT_URI = "AAAAAAAAAA";
    private static final String UPDATED_URI = "BBBBBBBBBB";

    private static final String DEFAULT_DOCUMENT_BLOB = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_BLOB = "BBBBBBBBBB";

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private DmDocumentLinksRepository dmDocumentLinksRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDmDocumentLinksMockMvc;

    private DmDocumentLinks dmDocumentLinks;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DmDocumentLinksResource dmDocumentLinksResource = new DmDocumentLinksResource(dmDocumentLinksRepository);
        this.restDmDocumentLinksMockMvc = MockMvcBuilders.standaloneSetup(dmDocumentLinksResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DmDocumentLinks createEntity(EntityManager em) {
        DmDocumentLinks dmDocumentLinks = new DmDocumentLinks()
            .documentName(DEFAULT_DOCUMENT_NAME)
            .fileName(DEFAULT_FILE_NAME)
            .filePath(DEFAULT_FILE_PATH)
            .uri(DEFAULT_URI)
            .documentBlob(DEFAULT_DOCUMENT_BLOB)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return dmDocumentLinks;
    }

    @Before
    public void initTest() {
        dmDocumentLinks = createEntity(em);
    }

    @Test
    @Transactional
    public void createDmDocumentLinks() throws Exception {
        int databaseSizeBeforeCreate = dmDocumentLinksRepository.findAll().size();

        // Create the DmDocumentLinks
        restDmDocumentLinksMockMvc.perform(post("/api/dm-document-links")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dmDocumentLinks)))
            .andExpect(status().isCreated());

        // Validate the DmDocumentLinks in the database
        List<DmDocumentLinks> dmDocumentLinksList = dmDocumentLinksRepository.findAll();
        assertThat(dmDocumentLinksList).hasSize(databaseSizeBeforeCreate + 1);
        DmDocumentLinks testDmDocumentLinks = dmDocumentLinksList.get(dmDocumentLinksList.size() - 1);
        assertThat(testDmDocumentLinks.getDocumentName()).isEqualTo(DEFAULT_DOCUMENT_NAME);
        assertThat(testDmDocumentLinks.getFileName()).isEqualTo(DEFAULT_FILE_NAME);
        assertThat(testDmDocumentLinks.getFilePath()).isEqualTo(DEFAULT_FILE_PATH);
        assertThat(testDmDocumentLinks.getUri()).isEqualTo(DEFAULT_URI);
        assertThat(testDmDocumentLinks.getDocumentBlob()).isEqualTo(DEFAULT_DOCUMENT_BLOB);
        assertThat(testDmDocumentLinks.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testDmDocumentLinks.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testDmDocumentLinks.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testDmDocumentLinks.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createDmDocumentLinksWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dmDocumentLinksRepository.findAll().size();

        // Create the DmDocumentLinks with an existing ID
        dmDocumentLinks.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDmDocumentLinksMockMvc.perform(post("/api/dm-document-links")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dmDocumentLinks)))
            .andExpect(status().isBadRequest());

        // Validate the DmDocumentLinks in the database
        List<DmDocumentLinks> dmDocumentLinksList = dmDocumentLinksRepository.findAll();
        assertThat(dmDocumentLinksList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDmDocumentLinks() throws Exception {
        // Initialize the database
        dmDocumentLinksRepository.saveAndFlush(dmDocumentLinks);

        // Get all the dmDocumentLinksList
        restDmDocumentLinksMockMvc.perform(get("/api/dm-document-links?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dmDocumentLinks.getId().intValue())))
            .andExpect(jsonPath("$.[*].documentName").value(hasItem(DEFAULT_DOCUMENT_NAME.toString())))
            .andExpect(jsonPath("$.[*].fileName").value(hasItem(DEFAULT_FILE_NAME.toString())))
            .andExpect(jsonPath("$.[*].filePath").value(hasItem(DEFAULT_FILE_PATH.toString())))
            .andExpect(jsonPath("$.[*].uri").value(hasItem(DEFAULT_URI.toString())))
            .andExpect(jsonPath("$.[*].documentBlob").value(hasItem(DEFAULT_DOCUMENT_BLOB.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getDmDocumentLinks() throws Exception {
        // Initialize the database
        dmDocumentLinksRepository.saveAndFlush(dmDocumentLinks);

        // Get the dmDocumentLinks
        restDmDocumentLinksMockMvc.perform(get("/api/dm-document-links/{id}", dmDocumentLinks.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dmDocumentLinks.getId().intValue()))
            .andExpect(jsonPath("$.documentName").value(DEFAULT_DOCUMENT_NAME.toString()))
            .andExpect(jsonPath("$.fileName").value(DEFAULT_FILE_NAME.toString()))
            .andExpect(jsonPath("$.filePath").value(DEFAULT_FILE_PATH.toString()))
            .andExpect(jsonPath("$.uri").value(DEFAULT_URI.toString()))
            .andExpect(jsonPath("$.documentBlob").value(DEFAULT_DOCUMENT_BLOB.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDmDocumentLinks() throws Exception {
        // Get the dmDocumentLinks
        restDmDocumentLinksMockMvc.perform(get("/api/dm-document-links/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDmDocumentLinks() throws Exception {
        // Initialize the database
        dmDocumentLinksRepository.saveAndFlush(dmDocumentLinks);
        int databaseSizeBeforeUpdate = dmDocumentLinksRepository.findAll().size();

        // Update the dmDocumentLinks
        DmDocumentLinks updatedDmDocumentLinks = dmDocumentLinksRepository.findOne(dmDocumentLinks.getId());
        // Disconnect from session so that the updates on updatedDmDocumentLinks are not directly saved in db
        em.detach(updatedDmDocumentLinks);
        updatedDmDocumentLinks
            .documentName(UPDATED_DOCUMENT_NAME)
            .fileName(UPDATED_FILE_NAME)
            .filePath(UPDATED_FILE_PATH)
            .uri(UPDATED_URI)
            .documentBlob(UPDATED_DOCUMENT_BLOB)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restDmDocumentLinksMockMvc.perform(put("/api/dm-document-links")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDmDocumentLinks)))
            .andExpect(status().isOk());

        // Validate the DmDocumentLinks in the database
        List<DmDocumentLinks> dmDocumentLinksList = dmDocumentLinksRepository.findAll();
        assertThat(dmDocumentLinksList).hasSize(databaseSizeBeforeUpdate);
        DmDocumentLinks testDmDocumentLinks = dmDocumentLinksList.get(dmDocumentLinksList.size() - 1);
        assertThat(testDmDocumentLinks.getDocumentName()).isEqualTo(UPDATED_DOCUMENT_NAME);
        assertThat(testDmDocumentLinks.getFileName()).isEqualTo(UPDATED_FILE_NAME);
        assertThat(testDmDocumentLinks.getFilePath()).isEqualTo(UPDATED_FILE_PATH);
        assertThat(testDmDocumentLinks.getUri()).isEqualTo(UPDATED_URI);
        assertThat(testDmDocumentLinks.getDocumentBlob()).isEqualTo(UPDATED_DOCUMENT_BLOB);
        assertThat(testDmDocumentLinks.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testDmDocumentLinks.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testDmDocumentLinks.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testDmDocumentLinks.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingDmDocumentLinks() throws Exception {
        int databaseSizeBeforeUpdate = dmDocumentLinksRepository.findAll().size();

        // Create the DmDocumentLinks

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDmDocumentLinksMockMvc.perform(put("/api/dm-document-links")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dmDocumentLinks)))
            .andExpect(status().isCreated());

        // Validate the DmDocumentLinks in the database
        List<DmDocumentLinks> dmDocumentLinksList = dmDocumentLinksRepository.findAll();
        assertThat(dmDocumentLinksList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDmDocumentLinks() throws Exception {
        // Initialize the database
        dmDocumentLinksRepository.saveAndFlush(dmDocumentLinks);
        int databaseSizeBeforeDelete = dmDocumentLinksRepository.findAll().size();

        // Get the dmDocumentLinks
        restDmDocumentLinksMockMvc.perform(delete("/api/dm-document-links/{id}", dmDocumentLinks.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DmDocumentLinks> dmDocumentLinksList = dmDocumentLinksRepository.findAll();
        assertThat(dmDocumentLinksList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DmDocumentLinks.class);
        DmDocumentLinks dmDocumentLinks1 = new DmDocumentLinks();
        dmDocumentLinks1.setId(1L);
        DmDocumentLinks dmDocumentLinks2 = new DmDocumentLinks();
        dmDocumentLinks2.setId(dmDocumentLinks1.getId());
        assertThat(dmDocumentLinks1).isEqualTo(dmDocumentLinks2);
        dmDocumentLinks2.setId(2L);
        assertThat(dmDocumentLinks1).isNotEqualTo(dmDocumentLinks2);
        dmDocumentLinks1.setId(null);
        assertThat(dmDocumentLinks1).isNotEqualTo(dmDocumentLinks2);
    }
}
